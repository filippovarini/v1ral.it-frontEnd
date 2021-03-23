import React, { Component } from "react";

import Header from "../../../components/Header/Header";
import Indexer from "../components/Indexer";
import CredentialsHeader from "../components/ShopRegisterHeader";
import Form from "./ShopCredentialsForm";

export class ShopCredentials extends Component {
  state = {
    city: null,
    street: null,
    province: null,
    postcode: null,
    email: null,
    psw: null,
    error: null
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      error: null
    });
  };

  credentialsValid = () => {
    if (!this.state.email || !this.state.psw) {
      this.setState({ error: "Completa tutti i campi" });
      return false;
    }
    if (this.state.psw.length < 8) {
      this.setState({
        error: "La password deve essere lunga almeno 8 caratteri"
      });
      return false;
    }
    return true;
  };

  placeValid = () => {
    if (
      !this.state.city ||
      !this.state.province ||
      !this.state.street ||
      !this.state.postcode
    ) {
      this.setState({ error: "Completa tutti i campi" });
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    if (this.credentialsValid() && this.placeValid()) {
      this.props.history.push("/shop/register/services");
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div className="page-wrapper box shop-register-container">
          <CredentialsHeader title="INSERISCI LE TUE CREDENZIALI" />
          <Form
            handleChange={this.handleChange}
            error={this.state.error}
            handleSubmit={this.handleSubmit}
          />
          <p
            className="button shop-register-button"
            onClick={this.handleSubmit}
          >
            PROSEGUI
          </p>
          <Indexer index={1} />
        </div>
      </div>
    );
  }
}

export default ShopCredentials;
