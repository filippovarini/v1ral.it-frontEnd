import React, { Component } from "react";

import HideCross from "../../../../components/HideCross/HideCross";
import BestSellings from "../../components/BestSelling";
import Form from "./AddGoalForm";

/** Pop up used to insert new goals
 * @param handleAdd function that fires on form submission
 * @param hidden
 * @param hide function to hide component
 * */

const bestSellingServices = [
  "Riassumere il 10% del personale",
  "Riassumere il 50% del persoale",
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

  handleSubmit = e => {
    e.preventDefault();
    if (this.validFields()) {
      this.props.hide();
      document.getElementById("addGoal-form").reset();
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
          <p id="addInfo-header">Aggiungi un privilegio</p>
          <p id="bestSelling-header">Best selling:</p>
          <div id="bestSelling-container" className="flex-col">
            <BestSellings bestSellings={bestSellingServices} />
          </div>
          <Form
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
          <p
            id="addInfo-submit"
            className="button-small"
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
