import React, { Component } from "react";

import Header from "../../components/Header/Header";
import ServiceHeader from "../ShopRegister/components/ShopRegisterHeader/ShopRegisterHeader";
import ServiceBoxes from "../../components/ServiceBoxes/ServiceBoxes";
import Indexer from "../ShopRegister/components/Indexer";
import AddService from "../ShopRegister/components/AddService/AddService";

import faqTitles from "../../faqData/faqHeaderTitles";

export class Services extends Component {
  state = {
    goals: [],
    addGoalHidden: true
  };

  toggleAddGoal = () => {
    this.setState({
      addGoalHidden: !this.state.addGoalHidden
    });
  };

  addGoal = goal => {
    this.setState({
      goals: [...this.state.goals, goal]
    });
  };

  handleSubmit = () => {
    this.props.history.push("/shop/register/done");
  };

  render() {
    return (
      <div>
        <Header titles={faqTitles} />
        <div className="box page-wrapper shop-register-container">
          <ServiceHeader title="COSA FARAI CON IL FINANZIAMENTO" />
          <p id="services-warning">
            Seleziona obbiettivi che vuoi raggiungere con i finanziamenti che
            riceverai
          </p>
          <div className="shop-register-body">
            <ServiceBoxes
              boxes={[{ type: "goal", services: this.state.goals }]}
              editing={true}
              handleClick={this.toggleAddGoal}
            />
            <AddService
              hidden={this.state.addGoalHidden}
              hide={this.toggleAddGoal}
              type="goal"
              handleAdd={this.addGoal}
              bestSellings={[
                "Riassumere il 10% del personale",
                "Riassumere il 50% del persoale",
                "Ristrutturare"
              ]}
            />
            <p
              className="button shop-register-button"
              onClick={this.handleSubmit}
            >
              CONFERMA
            </p>
          </div>
          <Indexer index={2} />
        </div>
      </div>
    );
  }
}

export default Services;
