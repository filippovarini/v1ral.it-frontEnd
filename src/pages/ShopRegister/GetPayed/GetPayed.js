import React, { Component } from "react";
import { connect } from "react-redux";
import "../shopRegister.css";
import "./getPayed.css";

import errorHandler from "../../../functions/errorHandler";

import it from "../../../locales/it.json";

import Header from "../../../components/Header/Header";
import RegisterHeader from "../ShopRegisterHeader";
import Loading from "../../../components/Loading/Loading";

export class GetPayed extends Component {
  state = { loading: false };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    if (!this.props.shopRegister || !this.props.shopRegister.bio)
      this.props.history.push("/shop/register/bio");
    else if (!this.props.shopRegister.credentials)
      this.props.history.push("/shop/register/credentials");
    else if (!this.props.shopRegister.services)
      this.props.history.push("/shop/register/services");
    else if (!this.props.shopRegister.goals)
      this.props.history.push("/shop/register/goals");
  };

  handleSubmit = () => {
    this.setState({ loading: true });
    // all info complete
    const {
      name,
      category,
      bio,
      backgroundurl,
      logourl
    } = this.props.shopRegister.bio;
    const {
      city,
      province,
      street,
      postcode,
      email,
      psw
    } = this.props.shopRegister.credentials;
    const {
      initialPrice,
      maxPremiums,
      services
    } = this.props.shopRegister.services;
    const goals = this.props.shopRegister.goals;
    const shop = {
      name,
      category,
      bio,
      backgroundurl,
      logourl,
      city,
      province,
      street,
      postcode,
      email,
      psw,
      initialPrice,
      maxPremiums,
      currentPrice: initialPrice,
      clicks: 0,
      connectedId: "still to implement"
    };
    console.log(shop);
    fetch("/transaction/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ registerSession: { shop, goals, services } })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          window.location = jsonRes.url;
        } else {
          alert(jsonRes.message);
          if (jsonRes.serverError) errorHandler.serverError(jsonRes);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="page-wrapper">
          {this.state.loading ? (
            <Loading />
          ) : (
            <div>
              <RegisterHeader navState={4} />
              <div className="shop-register-body">
                <div className="communication-panel big">
                  <p className="communication-panel-header">
                    {it.shop_register_get_payed_header}
                  </p>
                  <p className="communication-panel-text">
                    {it.shop_register_get_payed_text}
                  </p>
                  <p
                    id="get-payed-button"
                    className="button"
                    onClick={this.handleSubmit}
                  >
                    {it.shop_register_get_payed_button_text}
                  </p>
                  <div className="payment-secure flex-line">
                    <i className="fas fa-lock"></i>
                    <p>pagamenti sicuri con</p>
                    <i className="fab fa-stripe"></i>
                  </div>
                </div>
              </div>
            </div>
          )}
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

export default connect(mapStateToProps)(GetPayed);
