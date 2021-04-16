import React, { Component } from "react";

import errorHandler from "../../../functions/errorHandler";

import Loading from "../../Loading/Loading";
import PasswordForm from "../../Forms/PasswordForm";

/** Form used to see and edit place
 * @param hide function to hide component
 * @param hidden
 * @param isUser whether it is from user or shop
 */
export class EditPassword extends Component {
  state = {
    oldPsw: null,
    newPsw: null,
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

  validCredentials = () => {
    if (!this.state.oldPsw || !this.state.newPsw) {
      this.setState({
        error: "Compila tutti i campi o annulla le modifiche"
      });
      return false;
    } else if (this.state.oldPsw.length < 8 || this.state.newPsw.length < 8) {
      this.setState({
        error: "Le password devono essere lunghe almeno 8 caratteri"
      });
      return false;
    }

    return true;
  };

  handleSubmit = () => {
    if (this.validCredentials()) {
      this.setState({ loading: true });
      if (this.props.isUser)
        this.postUpdate("/user/updateInfo", {
          update: {},
          oldPsw: this.state.oldPsw,
          newPsw: this.state.newPsw
        });
      else
        this.postUpdate("/shop/updatePsw", {
          oldPsw: this.state.oldPsw,
          newPsw: this.state.newPsw
        });
    }
  };

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
          alert("Modifica salvata");
          window.location = window.location.pathname;
          this.loaded();
        } else if (jsonRes.pswInvalid) {
          this.setState({
            error: "La vecchia password fornita non è corretta"
          });
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
          <div id="editPassword" className="settings-wrapper">
            <Loading />
          </div>
        ) : (
          <div id="editPassword" className="settings-wrapper short">
            <i
              className="fas fa-times hide-cross"
              onClick={this.props.hide}
            ></i>
            <p className="settings-name">Modifica la password</p>
            <div className="settings-container">
              <PasswordForm
                handleChange={this.handleChange}
                oldPsw={this.state.oldPsw}
                newPsw={this.state.newPsw}
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

export default EditPassword;
