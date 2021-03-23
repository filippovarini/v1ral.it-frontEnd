import React, { Component } from "react";
import "./serviceOffered.css";

import Header from "../../../components/Header/Header";
import Indexer from "../components/Indexer";
import ServiceHeader from "../components/ShopRegisterHeader";
import ServiceForm from "./privateComponents/ServicePriceForm";
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
    if (this.validFields() && this.validServices())
      this.props.history.push("/shop/register/goals");
  };

  render() {
    return (
      <div>
        <Header />
        <div className="box page-wrapper shop-register-container">
          <ServiceHeader title="SCEGLI I PRIVILEGI DA OFFRIRE" />
          <p id="services-warning">
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
              />
              <AddService
                headerText="Aggiungi un privilegio"
                hidden={this.state.addInfoHidden}
                hide={this.toggleAddService}
                type={this.state.typeAdding}
                handleAdd={this.addInfo}
                bestSellings={["Salta Fila", "Targhetta sul muro", "Scono 10%"]}
              />
            </div>
            <p
              className="button shop-register-button"
              onClick={this.handleSubmit}
            >
              PROSEGUI
            </p>
          </div>
          <Indexer index={2} />
        </div>
      </div>
    );
  }
}

export default ServicesOffered;
