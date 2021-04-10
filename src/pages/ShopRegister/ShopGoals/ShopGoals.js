import React, { Component } from "react";
import { connect } from "react-redux";
import "./shopGoals.css";

import it from "../../../locales/it.json";

import Header from "../../../components/Header/Header";
import AddGoal from "./privateComponents/AddGoal";
import RegisterHeader from "../ShopRegisterHeader";
import Goals from "../../../components/Goals/Goals";

export class ShopGoals extends Component {
  state = {
    goals: [],
    addGoalHidden: true,
    error: null
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
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

  /** Removes goal by position in array */
  removeGoal = position => {
    this.setState({
      goals: this.state.goals.filter((_, i) => i !== position)
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
      this.props.history.push("/shop/register/getPayed");
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div className="page-wrapper">
          <RegisterHeader navState={3} />
          <div className="shop-register-body">
            <p className="register-warning">{it.shop_register_insert_goals}</p>
            <div className="shop-register-body">
              <div id="shop-register-goals-container">
                <Goals
                  goals={this.state.goals}
                  adding={true}
                  handleAddClick={this.toggleAddGoal}
                  deleteGoal={this.removeGoal}
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

export default connect(mapStateToProps)(ShopGoals);
