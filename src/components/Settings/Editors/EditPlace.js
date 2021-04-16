import React, { Component } from "react";
import it from "../../../locales/it.json";
import errorHandler from "../../../functions/errorHandler";

import Loading from "../../Loading/Loading";
import PlaceForm from "../../Forms/PlaceForm";

/** Form used to see and edit place
 * @param hide function to hide component
 * @param hidden
 * @param isUser whether it is from user or shop
 */
export class EditPlace extends Component {
  state = {
    city: null,
    province: null,
    street: null,
    postcode: null,
    error: null,
    loading: false
  };

  loaded = () => {
    this.setState({ loading: false });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      error: null
    });
  };

  validPlace = () => {
    if (
      !this.state.city ||
      !this.state.province ||
      !this.state.street ||
      !this.state.postcode
    ) {
      this.setState({
        error: "Compila tutti i campi"
      });
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    if (this.validPlace()) {
      this.setState({ loading: true });
      if (this.props.isUser)
        this.postUpdate("/user/updateInfo", {
          update: {
            city: this.state.city,
            province: this.state.province,
            street: this.state.street,
            postcode: this.state.postcode
          }
        });
      else
        this.postUpdate("/shop/updateInfo", {
          update: {
            city: this.state.city,
            province: this.state.province,
            street: this.state.street,
            postcode: this.state.postcode
          }
        });
    }
  };

  /** Updates for both user and shop */
  postUpdate = (url, body) => {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          window.location = window.location.pathname;
          this.loaded();
        } else if (jsonRes.unauthorized) {
          this.setState({
            error: "Non sei autorizzato ad effettuare questa modifica"
          });
          this.loaded();
        } else {
          errorHandler.serverError(jsonRes);
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    return (
      <div
        className="popUp-background"
        style={this.props.hidden ? { display: "none" } : null}
      >
        {this.state.loading ? (
          <div id="editPlace" className="settings-wrapper">
            <Loading />
          </div>
        ) : (
          <div id="editPlace" className="settings-wrapper">
            <i
              className="fas fa-times hide-cross"
              onClick={this.props.hide}
            ></i>
            <p className="settings-name">{it.edit_shipment_header}</p>
            <div className="settings-container">
              <PlaceForm
                handleChange={this.handleChange}
                city={this.state.city}
                province={this.state.province}
                street={this.state.street}
                postcode={this.state.postcode}
              />
              <p className="form-error settings-error">{this.state.error}</p>
              <p
                className="button settings-confirm"
                onClick={this.handleSubmit}
              >
                SALVA
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EditPlace;
