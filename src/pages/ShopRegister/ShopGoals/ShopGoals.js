import React, { Component } from "react";
import "./shopGoals.css";

import Header from "../../../components/Header/Header";
import ServiceHeader from "../components/ShopRegisterHeader";
import Indexer from "../components/Indexer";
import AddGoal from "./privateComponents/AddGoal";
import Goals from "../../../components/Goals/Goals";

export class ShopGoals extends Component {
  state = {
    goals: [],
    addGoalHidden: true,
    error: null
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

  validGoals = () => {
    if (this.state.goals.length === 0) {
      this.setState({ error: "Inserisci almeno un obbiettivo" });
      setTimeout(() => this.setState({ error: null }), 2000);
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    if (this.validGoals()) {
      this.props.history.push("/shop/register/done");
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div className="box page-wrapper shop-register-container">
          <ServiceHeader title="COSA FARAI CON IL FINANZIAMENTO" />
          <p id="services-warning">
            Seleziona obbiettivi che vuoi raggiungere con i finanziamenti che
            riceverai
          </p>
          <div className="shop-register-body">
            <div id="shop-register-goals-container">
              <Goals
                goals={this.state.goals}
                adding={true}
                handleAddClick={this.toggleAddGoal}
              />
              <AddGoal
                handleAdd={this.addGoal}
                hidden={this.state.addGoalHidden}
                hide={this.toggleAddGoal}
              />
            </div>
            <p className="form-error">{this.state.error}</p>
            <p
              className="button shop-register-button"
              onClick={this.handleSubmit}
            >
              CONFERMA
            </p>
          </div>
          <Indexer index={3} />
        </div>
      </div>
    );
  }
}

export default ShopGoals;
