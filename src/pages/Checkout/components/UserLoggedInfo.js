import React, { Component } from "react";
import errorHandler from "../../../functions/errorHandler";
import postImage from "../../../functions/postImage";
import "./components.css";

// components
import ShipmentForm from "./ShipmentForm";
import ShipmentStatic from "./ShipmentStatic";
import CardPreview from "../../../components/CardPreview/CardPreview";

/** Handles card preview showing
 * Handles shipment editing and showing
 * @param defaultInfo user info
 * @param handleSubmit
 */
export class UserLoggedInfo extends Component {
  state = {
    editing: false,
    city: null,
    province: null,
    street: null,
    postcode: null,
    profileurl: this.props.defaultInfo.profileurl,
    imageLoading: false,
    multerOperating: false,
    error: null
  };

  resetImage = () => {
    this.setState({ profileurl: null, multerOperating: false });
  };

  /** Saves the new image to s3 getting back an url
   * Once real url got back, set it on InsertUser state
   * @todo Avoid code repetition (same functions as in insertUser)
   */
  handleImageChange = async e => {
    this.setState({ imageLoading: true, error: null });
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function(event) {
        this.setState({
          profileurl: event.target.result,
          imageLoading: false
        });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
    // send request
    // post and save
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    this.setState({ multerOperating: true });
    const url = await postImage(formData);

    this.setState({ profileurl: url, multerOperating: false });
  };

  /** Toggles edit forms and resets default prpofileurl */
  toggleEdit = () => {
    this.setState({
      editing: !this.state.editing,
      profileurl: this.props.defaultInfo.profileurl
    });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value, error: null });
  };

  // checks if user has inserted all shipment info
  validShipment = () => {
    if (
      !this.state.city ||
      !this.state.street ||
      !this.state.province ||
      !this.state.postcode
    ) {
      this.setState({ error: "Completa tutti i campi" });
      return false;
    } else return true;
  };

  // checks if the image has been inserted
  validImage = () => {
    if (!this.state.profileurl) {
      this.setState({
        error: "Inserisci l'immagine profilo o annulla le modifiche"
      });
      return false;
    } else return true;
  };

  handleSubmit = () => {
    if (!this.state.editing) this.props.handleSubmit();
    else if (this.validShipment() && this.validImage()) {
      let update = {
        city: this.state.city,
        street: this.state.street,
        province: this.state.province,
        postcode: this.state.postcode
      };
      if (this.state.profileurl !== this.props.defaultInfo.profileurl)
        update = { ...update, profileurl: this.state.profileurl };
      fetch("/user/updateInfo", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          update
        })
      })
        .then(res => res.json())
        .then(jsonRes => {
          if (jsonRes.success) {
            this.props.handleSubmit();
          } else if (jsonRes.unauthorized) {
            this.setState({ error: jsonRes.message });
          } else errorHandler.serverError(jsonRes); // server error
        })
        .catch(e => {
          console.log(e);
          errorHandler.clientError();
        });
    }
  };

  render() {
    const body = this.state.editing ? (
      <div>
        <CardPreview
          challenger={this.props.defaultInfo.challenger}
          username={this.props.defaultInfo.username}
          resetImage={this.resetImage}
          handleImageChange={this.handleImageChange}
          url={this.state.profileurl}
          imageLoading={this.state.imageLoading}
        />
        <ShipmentForm handleChange={this.handleChange} />
      </div>
    ) : (
      <div>
        <CardPreview
          challenger={this.props.defaultInfo.challenger}
          username={this.props.defaultInfo.username}
          static={true}
          url={this.props.defaultInfo.profileurl}
        />
        <ShipmentStatic defaultInfo={this.props.defaultInfo} />
      </div>
    );
    return (
      <div id="user-logged-info">
        <p id="insertUser-header" style={{ marginTop: "50px" }}>
          Inserisci le informazioni di contagio
        </p>
        {body}
        <p
          style={{
            textAlign: "center",
            cursor: "pointer",
            textDecoration: "underline"
          }}
          onClick={this.toggleEdit}
        >
          {this.state.editing ? "annulla le modifiche" : "modifica"}
        </p>
        <p className="form-error">{this.state.error}</p>
        {this.state.multerOperating ? (
          <div id="checkout-confirm" className="button button-disabled">
            caricando l'immagine...
          </div>
        ) : (
          <p
            id="checkout-confirm"
            className="button"
            onClick={this.handleSubmit}
          >
            {this.state.editing ? "SALVA E PROCEDI" : "PROCEDI"}
          </p>
        )}
      </div>
    );
  }
}

export default UserLoggedInfo;
