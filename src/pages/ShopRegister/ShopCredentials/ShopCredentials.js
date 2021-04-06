import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "../../../components/Header/Header";
import Form from "./ShopCredentialsForm";
import RegisterHeader from "../ShopRegisterHeader";

import it from "../../../locales/it.json";

export class ShopCredentials extends Component {
  state = {
    city: null,
    street: null,
    province: null,
    postcode: null,
    email: null,
    psw: null,
    error: null,
    check1: false,
    check2: false
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    if (!this.props.shopRegister || !this.props.shopRegister.bio) {
      this.props.history.push("/shop/register/bio");
    } else if (
      this.props.shopRegister &&
      this.props.shopRegister.credentials &&
      this.props.shopRegister.credentials.city
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

  checkboxesValid = () => {
    if (!this.state.check1 || !this.state.check2) {
      this.setState({ error: it.tick_all_checkboxes });
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    if (
      this.credentialsValid() &&
      this.placeValid() &&
      this.checkboxesValid()
    ) {
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
        <div className="page-wrapper">
          <RegisterHeader navState={1} />
          <div className="shop-register-body">
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
              toggleCheck1={() =>
                this.setState({ error: null, check1: !this.state.check1 })
              }
              toggleCheck2={() =>
                this.setState({ error: null, check2: !this.state.check2 })
              }
            />
            <p
              className="button shop-register-button"
              onClick={this.handleSubmit}
            >
              PROSEGUI
            </p>
          </div>
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
