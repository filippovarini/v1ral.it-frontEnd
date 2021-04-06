import React, { Component } from "react";

import it from "../../../../locales/it.json";

import HideCross from "../../../../components/HideCross/HideCross";
import Form from "./AddGoalForm";

/** Pop up used to insert new goals
 * @param handleAdd function that fires on form submission
 * @param hidden
 * @param hide function to hide component
 * */

const bestSellingGoals = [
  "Riassumere il 10% del personale",
  "Riassumere il 50% del personale",
  "Ristrutturare"
];

export class AddGoal extends Component {
  state = {
    name: null,
    amount: null,
    error: null
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value, error: null });
  };

  validFields = () => {
    if (!this.state.name || !this.state.amount) {
      this.setState({ error: "Compila tutti i campi" });
      return false;
    }
    return true;
  };

  resetForm = () => {
    this.props.hide();
    document.getElementById("addGoal-form").reset();
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.validFields()) {
      this.resetForm();
      this.props.handleAdd({
        name: this.state.name,
        amount: parseInt(this.state.amount)
      });
    }
  };

  toggleIcons = () => {
    this.setState({ iconsHidden: !this.state.iconsHidden });
  };

  render() {
    return (
      <div
        className="popUp-background"
        style={this.props.hidden ? { display: "none" } : null}
      >
        <div id="addInfo-container" className="box popUp">
          <HideCross hide={() => this.props.hide()} />
          <p id="addInfo-header">{it.shop_register_insert_goal}</p>
          <p id="addInfo-description">{it.goals_restart_index}</p>
          <p id="bestSelling-header">{it.add_service_best_selling}</p>
          <ul id="bestSelling-container" className="flex-col">
            {bestSellingGoals.map((goal, i) => {
              return (
                <li key={i} className="bestSelling-title">
                  {goal}
                </li>
              );
            })}
          </ul>
          <Form
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
          <p
            id="addInfo-submit"
            className="button small"
            onClick={this.handleSubmit}
          >
            AGGIUNGI
          </p>
          <p id="addInfo-error" className="form-error">
            {this.state.error}
          </p>
        </div>
      </div>
    );
  }
}

export default AddGoal;
