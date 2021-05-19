import React, { Component } from "react";
import errorHandler from "../../../functions/errorHandler";
import Loading from "../../Loading/Loading";

export class AddPasses extends Component {
  state = {
    loading: false,
    newPasses: false,
    error: null
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value, error: null });
  };

  validFields = () => {
    if (
      !this.state.newPasses ||
      isNaN(this.state.newPasses) ||
      this.state.newPasses <= 0
    ) {
      this.setState({ error: "Inserisci un numero valido" });
      return false;
    }
    return true;
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.validFields()) {
      this.setState({ loading: true });
      fetch("/shop/passes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ newPasses: parseInt(this.state.newPasses) })
      })
        .then(res => res.json())
        .then(jsonRes => {
          if (jsonRes.success) {
            window.location = window.location.pathname;
          } else {
            this.setState({ error: jsonRes.message });
            if (jsonRes.serverError) errorHandler.serverError(jsonRes);
          }
        })
        .catch(e => {
          console.log(e);
          errorHandler.clientError();
        });
    }
  };

  render() {
    return (
      <div
        className="popUp-background"
        style={this.props.hidden ? { display: "none" } : null}
      >
        {this.state.loading ? (
          <div className="settings-wrapper">
            <Loading />
          </div>
        ) : (
          <div className="settings-wrapper">
            <i
              className="fas fa-times hide-cross"
              onClick={this.props.hide}
            ></i>
            <p className="settings-name">Metti altri pass in vendita</p>
            <p className="settings-description">
              Aggiungi altri pass da vendere ai tuoi clienti, prima che vadano
              tutti sold out!
            </p>
            <form className="settings-container" onSubmit={this.handleSubmit}>
              <input
                onChange={this.handleChange}
                type="number"
                placeholder="e.g. 50"
                id="newPasses"
              />
              <p className="form-error settings-error">{this.state.error}</p>
              <input
                type="submit"
                className="button settings-confirm"
                onClick={this.handleSubmit}
                value="salva"
              />
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default AddPasses;
