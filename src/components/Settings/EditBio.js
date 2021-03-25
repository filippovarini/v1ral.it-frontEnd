import React, { Component } from "react";
import "./settings.css";

import errorHandler from "../../functions/errorHandler";

import BioForm from "../Forms/BioForm";
import Loading from "../Loading/Loading";

/** Form used to see and edit bio
 * @param hide function to hide component
 * @param hidden
 * @param isUser whether it is from user or shop
 */
export class EditBio extends Component {
  state = {
    bio: null,
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

  validBio = () => {
    if (
      !this.state.bio ||
      this.state.bio.length > 250 ||
      this.state.bio.length < 10
    ) {
      this.setState({
        error: "La bio deve essere lunga minimo 10 massimo 250 caratteri"
      });
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    if (this.validBio()) {
      this.setState({ loading: true });
      if (this.props.isUser) this.editUser();
      else this.editShop();
    }
  };

  editUser = () => {
    fetch("/user/updateInfo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ update: { reason: this.state.bio } })
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
          <div id="editBio" className="settings-wrapper">
            <Loading />
          </div>
        ) : (
          <div id="editBio" className="settings-wrapper">
            <i
              className="fas fa-times hide-cross"
              onClick={this.props.hide}
            ></i>
            <div className="settings-container">
              <p className="settings-name">
                {this.props.isUser
                  ? "Modifica il motivo per cui partecipi alla challenge"
                  : "Modifica la tua bio"}
              </p>
              <BioForm handleChange={this.handleChange} bio={this.state.bio} />
              <p className="form-error">{this.state.error}</p>
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

export default EditBio;