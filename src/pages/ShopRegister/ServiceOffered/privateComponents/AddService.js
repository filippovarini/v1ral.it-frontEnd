import React, { Component } from "react";

import HideCross from "../../../../components/HideCross/HideCross";
import Icons from "./Icons";
import ServiceForm from "./AddServiceForm";

/** Pop up used to insert new goals and services
 * @param handleAdd function that fires on form submission
 * @param hidden
 * @param hide function to hide component
 * */

const bestSellingServices = ["Salta Fila", "Targhetta sul muro", "Scono 10%"];

export class AddService extends Component {
  state = {
    image: null,
    title: null,
    viral: false,
    error: null,
    iconsHidden: true
  };

  handleChange = e => {
    if (e.target.id === "type") {
      this.setState({ viral: !this.state.viral });
    } else {
      // title
      this.setState({ title: e.target.value });
    }
    this.setState({ error: null });
  };

  handleImageChange = url => {
    this.setState({ image: url, iconsHidden: true, error: null });
  };

  validFields = () => {
    if (!this.state.image || !this.state.title) {
      this.setState({ error: "Compila tutti i campi" });
      return false;
    }
    return true;
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.validFields()) {
      this.props.hide();
      this.setState({ image: null });
      document.getElementById("addService-form").reset();
      this.props.handleAdd({
        image: this.state.image,
        name: this.state.title,
        type: this.state.viral ? "viral" : "standard"
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
          <Icons
            addIcon={this.handleImageChange}
            hidden={this.state.iconsHidden}
            hideIcons={this.toggleIcons}
          />
          <p id="addInfo-header">Aggiungi un privilegio</p>
          <p id="bestSelling-header">Best selling:</p>
          <div id="bestSelling-container" className="flex-col">
            {bestSellingServices.map((service, i) => {
              return (
                <p key={i} className="bestSelling-title">
                  {service}
                </p>
              );
            })}
          </div>
          <ServiceForm
            handleSubmit={this.handleSubmit}
            toggleIcons={this.toggleIcons}
            url={this.state.image}
            handleChange={this.handleChange}
            handleImageChange={this.handleImageChange}
            // title={this.state.title}
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

export default AddService;
