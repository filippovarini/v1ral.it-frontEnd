import React, { Component } from "react";
import { connect } from "react-redux";
import "./shopCredentials.css";

import Form from "./ShopCredentialsForm";
import RegisterHeader from "../components/ShopRegisterHeader";
import Buttons from "../components/Buttons";

import it from "../../../locales/it.json";

export class ShopCredentials extends Component {
  state = {
    city: null,
    street: null,
    province: null,
    postcode: null,
    email: null,
    psw: null,
    ownerName: null,
    ownerPhone: null,
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
        psw: this.props.shopRegister.credentials.psw,
        ownerName: this.props.shopRegister.credentials.ownerName,
        ownerPhone: this.props.shopRegister.credentials.ownerPhone
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

  ownerValid = () => {
    if (!this.state.ownerName || !this.state.ownerPhone) {
      this.setState({ error: "Completa tutti i campi" });
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    if (
      this.credentialsValid() &&
      this.ownerValid() &&
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
          email: this.state.email.toLowerCase(),
          psw: this.state.psw,
          ownerName: this.state.ownerName,
          ownerPhone: this.state.ownerPhone
        }
      });
      this.props.history.push("/shop/register/stock");
    }
  };

  render() {
    return (
      <div className="page-wrapper">
        <RegisterHeader navState={1} />
        <div className="shop-register-body">
          <p className="shop-register-body-header">
            {it.shop_register_credentials_header}
          </p>
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            email={this.state.email}
            psw={this.state.psw}
            ownerName={this.state.ownerName}
            ownerPhone={this.state.ownerPhone}
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

          <Buttons
            handleClickNext={this.handleSubmit}
            handleClickPrev={() =>
              this.props.history.push("/shop/register/bio")
            }
            error={this.state.error}
          />
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
