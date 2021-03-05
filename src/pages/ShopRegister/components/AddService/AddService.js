import React, { Component } from "react";
import "./addService.css";

import HideCross from "../../../../components/HideCross/HideCross";
import Icons from "./components/Icons";
import BestSellings from "./components/BestSelling";
import ServiceForm from "./components/ServiceForm";
import GoalForm from "./components/GoalForm";

/**
 * Used to select BOTH goals and services
 * PROPS:
 * type
 * handleAdd()
 * hidden
 * hide()
 * bestSellings
 * */

const emptyState = {
  otherData: null,
  title: "",
  error: null,
  iconsHidden: true
};
export class AddService extends Component {
  state = emptyState;

  handleServiceChange = e => {
    this.setState({ title: e.target.value, error: null });
  };

  handleImageChange = url => {
    this.setState({ otherData: url, iconsHidden: true });
  };

  handleOtherDataChange = e => {
    this.setState({ otherData: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.otherData || !this.state.title) {
      this.setState({ error: "Compila tutti i campi" });
    } else {
      this.setState(emptyState);
      this.props.hide();
      this.props.handleAdd({
        otherData: this.state.otherData,
        title: this.state.title
      });
    }
  };

  toggleIcons = () => {
    this.setState({ iconsHidden: !this.state.iconsHidden });
  };

  render() {
    const serviceForm = (
      <ServiceForm
        handleSubmit={this.handleSubmit}
        toggleIcons={this.toggleIcons}
        otherData={this.state.otherData}
        handleServiceChange={this.handleServiceChange}
        title={this.state.title}
        handleImageChange={this.handleImageChange}
      />
    );
    const goalForm = (
      <GoalForm
        handleSubmit={this.handleSubmit}
        handleServiceChange={this.handleServiceChange}
        title={this.state.title}
        handleOtherDataChange={this.handleOtherDataChange}
      />
    );

    const form = this.props.type === "goal" ? goalForm : serviceForm;
    return (
      <div
        className="popUp-background"
        style={this.props.hidden ? { display: "none" } : null}
      >
        <div id="addService-container" className="box popUp">
          <HideCross hide={() => this.props.hide(null)} />
          <Icons
            addIcon={this.handleImageChange}
            hidden={this.state.iconsHidden}
            hideIcons={this.toggleIcons}
          />
          <p id="addService-header">Aggiungi un servizio {this.props.type}</p>
          <p id="bestSelling-header">Best selling:</p>
          <div id="bestSelling-container" className="flex-col">
            <BestSellings bestSellings={this.props.bestSellings} />
          </div>
          {form}
          <p
            id="addService-submit"
            className="button-small"
            onClick={this.handleSubmit}
          >
            AGGIUNGI
          </p>
          <p id="addService-error" className="form-error">
            {this.state.error}
          </p>
        </div>
      </div>
    );
  }
}

export default AddService;
