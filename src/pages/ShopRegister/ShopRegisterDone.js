import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";

export class ShopRegisterDone extends Component {
  state = {
    loading: false
  };

  componentDidMount = () => {
    if (!this.props.shopRegister) this.props.history.push("/shop/register/bio");
    else if (!this.props.shopRegister.bio)
      this.props.history.push("/shop/register/bio");
    else if (!this.props.shopRegister.credentials)
      this.props.history.push("/shop/register/credentials");
    else if (!this.props.shopRegister.services)
      this.props.history.push("/shop/register/services");
    else if (!this.props.shopRegister.goals)
      this.props.history.push("/shop/register/goals");
    else {
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
    }
  };

  render() {
    const body = (
      <div className="communication-panel big">
        <p className="communication-panel-header">Successo</p>
        <p className="communication-panel-text">
          La registrazione è avvenuta con successo, e sei pronto a vendere i
          tuoi contagi agli utenti della nostra piattaforma.
        </p>
        <p className="communication-panel-text">
          Per ottenere il maggior numero di ordini possibile, ti consigliamo di
          utilizzare i nostri metodi di <i>diffusione del contagio</i>, che
          aumenteranno le interactions con gli utenti, danto alla tua impresa
          anche publicità
        </p>
        <Link to="/spread" className="communication-panel-button button-small">
          DIFFONDI IL CONTAGIO
        </Link>
      </div>
    );
    return (
      <div>
        <Header />
        <div className="page-wrapper">
          {this.state.loading ? <Loading /> : body}
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

export default ShopRegisterDone;
