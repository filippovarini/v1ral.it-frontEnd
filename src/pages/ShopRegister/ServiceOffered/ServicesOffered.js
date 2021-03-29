import React, { Component } from "react";
import { connect } from "react-redux";
import "./serviceOffered.css";

import Header from "../../../components/Header/Header";
import ServiceForm from "./privateComponents/ServicePriceForm";
import RegisterHeader from "../ShopRegisterHeader";
import AddService from "./privateComponents/AddService";
import Services from "../../../components/Services/Services";

export class ServicesOffered extends Component {
  state = {
    maxPremiums: null,
    initialPrice: null,
    services: [],
    addInfoHidden: true,
    error: null
  };

  componentDidMount = () => {
    if (!this.props.shopRegister) this.props.history.push("/shop/register/bio");
    else if (!this.props.shopRegister.bio)
      this.props.history.push("/shop/register/bio");
    else if (!this.props.shopRegister.credentials)
      this.props.history.push("/shop/register/credentials");
    else if (
      this.props.shopRegister.services &&
      this.props.shopRegister.services.maxPremiums
    ) {
      this.setState({
        services: this.props.shopRegister.services.services,
        maxPremiums: this.props.shopRegister.services.maxPremiums,
        initialPrice: this.props.shopRegister.services.initialPrice
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      error: null
    });
  };

  validFields = () => {
    if (!this.state.maxPremiums || !this.state.initialPrice) {
      this.setState({ error: "Compila tutti i campi" });
      return false;
    }
    return true;
  };

  validServices = () => {
    if (this.state.services.length === 0) {
      this.setState({ error: "Aggiungi almeno un privilegio" });
      return false;
    }
    return true;
  };

  toggleAddService = () => {
    this.setState({
      addInfoHidden: !this.state.addInfoHidden
    });
  };

  addInfo = service => {
    this.setState({
      services: [...this.state.services, service]
    });
  };

  handleSubmit = () => {
    if (this.validFields() && this.validServices()) {
      this.props.dispatch({
        type: "SET-SERVICES",
        services: {
          services: this.state.services,
          maxPremiums: this.state.maxPremiums,
          initialPrice: this.state.initialPrice
        }
      });
      this.props.history.push("/shop/register/goals");
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div className="page-wrapper">
          <RegisterHeader navState={2} />
          <div className="shop-register-body">
            <p className="register-warning">
              Attenzione:
              <br />È fondamentale offrire servizi <b>
                utili
              </b> <b>tangibili</b> e <b>utilizzabili</b>
            </p>
            <div className="shop-register-body">
              <div id="serviceOffered-body" className="flex-line">
                <Services
                  services={this.state.services}
                  adding={true}
                  handleAddClick={this.toggleAddService}
                />
                <ServiceForm
                  handleChange={this.handleChange}
                  error={this.state.error}
                  handleSubmit={this.handleSubmit}
                  maxPremiums={this.state.maxPremiums}
                  initialPrice={this.state.initialPrice}
                />
                <AddService
                  headerText="Aggiungi un privilegio"
                  hidden={this.state.addInfoHidden}
                  hide={this.toggleAddService}
                  type={this.state.typeAdding}
                  handleAdd={this.addInfo}
                  bestSellings={[
                    "Salta Fila",
                    "Targhetta sul muro",
                    "Scono 10%"
                  ]}
                />
              </div>
              <p
                className="button shop-register-button"
                onClick={this.handleSubmit}
              >
                PROSEGUI
              </p>
            </div>
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

export default connect(mapStateToProps)(ServicesOffered);
