import React, { Component } from "react";
import "./addPriv.css";
import it from "../../locales/it.json";

import PrivForm from "./AddPriviledgeForm";
import Suggestions from "./Suggestions";

/** Pop up used to insert new goals and services
 * @param handleAdd function that fires on form submission
 * @param hidden
 * @param hide function to hide component
 * @param type
 * */

export class AddService extends Component {
  state = {
    title: null,
    description: null,
    error: null
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value, error: null });
  };

  validFields = () => {
    if (!this.state.title || !this.state.description) {
      this.setState({ error: "Compila tutti i campi" });
      return false;
    }
    return true;
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.validFields()) {
      document.getElementById("addPriv-form").reset();
      this.props.handleAdd({
        title: this.state.title,
        description: this.state.description,
        type: this.props.type
      });
    }
  };

  render() {
    return (
      <div id="addInfo-container" className="box popUp">
        <i className="fas fa-times hide-cross" onClick={this.props.hide}></i>
        <p id="addInfo-header">
          {this.props.type === "stock"
            ? it.add_priv_header_stock
            : it.add_priv_header_v1ralPass}
        </p>
        <p id="addInfo-description">{it.add_service_description}</p>
        <PrivForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          error={this.state.error}
        />
        <Suggestions />
      </div>
    );
  }
}

export default AddService;
