import React, { Component } from "react";
import { connect } from "react-redux";

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

  componentDidMount = () => {
    if (!this.props.shopRegister || !this.props.shopRegister.bio) {
      this.props.history.push("/shop/register/bio");
    } else if (
      this.props.shopRegister &&
      this.props.shopRegister.credentials &&
      this.props.shopRegister.city
    ) {
      this.setState({
        city: this.props.shopRegister.credentials.city,
        street: this.props.shopRegister.credentials.street,
        province: this.props.shopRegister.credentials.province,
        postcode: this.props.shopRegister.credentials.postcode,
        email: this.props.shopRegister.credentials.email,
        psw: this.props.shopRegister.credentials.psw
      });
    }
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
      this.props.dispatch({
        type: "SET-CREDENTIALS",
        credentials: {
          city: this.state.city,
          street: this.state.street,
          province: this.state.province,
          postcode: this.state.postcode,
          email: this.state.email,
          psw: this.state.psw
        }
      });
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
            email={this.state.email}
            psw={this.state.psw}
            city={this.state.city}
            street={this.state.street}
            province={this.state.province}
            postcode={this.state.postcode}
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

const mapStateToProps = state => {
  return {
    shopRegister: state.shopRegister
  };
};

export default connect(mapStateToProps)(ShopCredentials);
