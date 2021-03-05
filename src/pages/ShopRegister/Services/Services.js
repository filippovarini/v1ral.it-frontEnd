import React, { Component } from "react";
import "./services.css";

import Header from "../../../components/Header/Header";
import ServiceHeader from "./components/ServicesHeader/ServicesHeader";
import ServiceBoxes from "../../../components/ServiceBoxes/ServiceBoxes";
import Indexer from "../components/Indexer";
import AddService from "./components/AddService/AddService";

import faqTitles from "../../../faqData/faqHeaderTitles";

export class Services extends Component {
  state = {
    premium: [],
    viral: [],
    addServiceHidden: true,
    typeAdding: null
  };

  toggleAddService = type => {
    console.log(type);
    this.setState({
      addServiceHidden: !this.state.addServiceHidden,
      typeAdding: type
    });
  };

  addService = service => {
    const type = this.state.typeAdding;
    this.setState({
      [this.state.typeAdding]: [...this.state[type], service]
    });
  };

  render() {
    return (
      <div>
        <Header titles={faqTitles} />
        <div className="box page-wrapper shop-register-container">
          <ServiceHeader />
          <p id="services-warning">
            Attenzione:
            <br />È fondamentale offrire servizi <b>
              utili
            </b> <b>tangibili</b> e <b>utilizzabili</b>
          </p>
          <ServiceBoxes
            boxes={[
              { type: "premium", services: this.state.premium },
              { type: "viral", services: this.state.viral }
            ]}
            editing={true}
            handleClick={this.toggleAddService}
          />
          <Indexer index={1} />
          <AddService
            hidden={this.state.addServiceHidden}
            hide={this.toggleAddService}
            type={this.state.typeAdding}
            handleAdd={this.addService}
          />
        </div>
      </div>
    );
  }
}

export default Services;
