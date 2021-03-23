import React, { Component } from "react";
import { connect } from "react-redux";
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

  componentDidMount = () => {
    if (!this.props.shopRegister) this.props.history.push("/shop/register/bio");
    else if (!this.props.shopRegister.bio)
      this.props.history.push("/shop/register/bio");
    else if (!this.props.shopRegister.credentials)
      this.props.history.push("/shop/register/credentials");
    else if (!this.props.shopRegister.services)
      this.props.history.push("/shop/register/services");
    else if (this.props.shopRegister.goals) {
      this.setState({ goals: this.props.shopRegister.goals });
    }
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
      this.props.dispatch({
        type: "SET-GOALS",
        goals: this.state.goals
      });
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

const mapStateToProps = state => {
  return {
    shopRegister: state.shopRegister
  };
};

export default connect(mapStateToProps)(ShopGoals);
