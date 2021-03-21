import React, { Component } from "react";

import Header from "../../components/Header/Header";
import ServiceHeader from "../ShopRegister/components/ShopRegisterHeader/ShopRegisterHeader";
import ServiceBoxes from "../../components/ServiceBoxes/ServiceBoxes";
import Indexer from "../ShopRegister/components/Indexer";
import AddService from "../ShopRegister/components/AddService/AddService";

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

  handleSubmit = () => {
    this.props.history.push("/shop/register/goals");
  };

  render() {
    return (
      <div>
        <Header />
        <div className="box page-wrapper shop-register-container">
          <ServiceHeader title="SCEGLI I SERVIZI DA OFFRIRE" />
          <p id="services-warning">
            Attenzione:
            <br />È fondamentale offrire servizi <b>
              utili
            </b> <b>tangibili</b> e <b>utilizzabili</b>
          </p>
          <div className="shop-register-body">
            <ServiceBoxes
              boxes={[
                { type: "premium", services: this.state.premium },
                { type: "viral", services: this.state.viral }
              ]}
              editing={true}
              handleClick={this.toggleAddService}
            />
            <AddService
              hidden={this.state.addServiceHidden}
              hide={this.toggleAddService}
              type={this.state.typeAdding}
              handleAdd={this.addService}
              bestSellings={["Salta Fila", "Targhetta sul muro", "Scono 10%"]}
            />
            <p
              className="button shop-register-button"
              onClick={this.handleSubmit}
            >
              PROSEGUI
            </p>
          </div>
          <Indexer index={1} />
        </div>
      </div>
    );
  }
}

export default Services;
