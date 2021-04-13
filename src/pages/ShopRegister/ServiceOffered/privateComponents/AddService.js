import React, { Component } from "react";
import suggestedInfo from "../../../../locales/suggestedInfo";
import it from "../../../../locales/it.json";
import Icons from "./Icons";
import ServiceForm from "./AddServiceForm";

/** Pop up used to insert new goals and services
 * @param handleAdd function that fires on form submission
 * @param hidden
 * @param hide function to hide component
 * */

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
      this.setState({ image: null, viral: false });
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
          <i className="fas fa-times hide-cross" onClick={this.props.hide}></i>
          <Icons
            addIcon={this.handleImageChange}
            hidden={this.state.iconsHidden}
            hideIcons={this.toggleIcons}
          />
          <p id="addInfo-header">{it.add_service}</p>
          <p id="addInfo-description">{it.add_service_description}</p>
          <p id="bestSelling-header">
            {it.shop_register_add_product_suggestions}
          </p>
          <ul id="bestSelling-container" className="flex-col">
            {suggestedInfo.services.map((service, i) => {
              return (
                <li key={i} className="bestSelling-title">
                  {service}
                </li>
              );
            })}
          </ul>
          <ServiceForm
            handleSubmit={this.handleSubmit}
            toggleIcons={this.toggleIcons}
            url={this.state.image}
            handleChange={this.handleChange}
            handleImageChange={this.handleImageChange}
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

export default AddService;
