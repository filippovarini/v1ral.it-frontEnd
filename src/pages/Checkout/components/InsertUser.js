import React, { Component } from "react";
import errorHandler from "../../../errorHandler";
import "./components.css";

import CardPreview from "../../../components/CardPreview/CardPreview";
import Loading from "../../../components/Loading/Loading";

/** Insert new user info
 * @param challenger
 * @param handleSubmit
 */
export class InsertUser extends Component {
  state = {
    username: null,
    email: null,
    city: null,
    province: null,
    street: null,
    postcode: null,
    psw: null,
    reason: null,
    error: null,
    // image state
    multerOperating: false,
    imageLoading: false,
    profileUrl: null
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      error: false
    });
  };

  resetImage = () => {
    this.setState({ profileUrl: null, multerOperating: false });
  };

  /** Saves the new image to s3 getting back an url
   * Once real url got back, set it on InsertUser state
   */
  handleImageChange = e => {
    this.setState({ imageLoading: true });
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function(event) {
        this.setState({
          profileUrl: event.target.result,
          imageLoading: false
          // submitting: false,
          // loading: false
        });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
    // send request
    // post and save
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    this.setState({ multerOperating: true });
    fetch("/image", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          this.setState({ profileUrl: jsonRes.url, multerOperating: false });
        } else errorHandler.serverError(jsonRes);
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  // checks user has inserted all credentials
  validCredentials = () => {
    if (!this.state.username || !this.state.email || !this.state.psw) {
      this.setState({ error: "Completa tutti i campi" });
    } else if (
      this.state.username.includes("@") ||
      this.state.username.includes(" ")
    ) {
      this.setState({
        error:
          "L'username non può contenere caratteri speciali come spazio e '@'"
      });
    } else return true;
    return false;
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
    if (!this.state.profileUrl) {
      this.setState({ error: "Inserisci l'immagine profilo" });
      return false;
    } else return true;
  };

  handleSubmit = () => {
    if (this.validCredentials() && this.validShipment() && this.validImage()) {
      const newUser = {
        username: this.state.username,
        email: this.state.email,
        type: "standard",
        challenger: this.props.challenger,
        city: this.state.city,
        province: this.state.province,
        street: this.state.street,
        postcode: this.state.postcode,
        profileUrl: this.state.profileUrl,
        psw: this.state.psw,
        reason: null
      };
      this.props.handleSubmit(newUser);
    }
  };

  render() {
    return (
      <div id="insertUser-container">
        <p id="insertUser-header">Inserisci le informazioni di contagio</p>
        <CardPreview
          challenger={this.props.challenger}
          username={this.state.username}
          resetImage={this.resetImage}
          handleImageChange={this.handleImageChange}
          url={this.state.profileUrl}
          imageLoading={this.state.imageLoading}
        />
        <form
          id="credentials-form"
          className="log-form"
          style={{ marginBottom: "0px" }}
        >
          <p className="log-form-subtext">CREDENZIALI</p>
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="email"
            id="email"
            onChange={this.handleChange}
          />
          <input
            type="password"
            placeholder="password"
            id="psw"
            onChange={this.handleChange}
          />
        </form>
        <form
          id="shipment-form"
          className="log-form"
          style={{ marginBottom: "0px" }}
        >
          <p className="form-header">SPEDIZIONE</p>
          <input
            type="text"
            placeholder="città"
            id="city"
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="provincia"
            id="province"
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="via"
            id="street"
            onChange={this.handleChange}
          />
          <input
            type="number"
            placeholder="CAP"
            id="postcode"
            onChange={this.handleChange}
          />
          <p className="form-error">{this.state.credentialError}</p>
        </form>
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
            SALVA E PROCEDI
          </p>
        )}
      </div>
    );
  }
}

export default InsertUser;
