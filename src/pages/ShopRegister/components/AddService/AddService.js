import React, { Component } from "react";
import "./addService.css";

import HideCross from "../../../../components/HideCross/HideCross";
import Icons from "./components/Icons";
import IconFields from "./components/IconFields";
import BestSellings from "./components/BestSelling";

/**
 * PROPS:
 * type
 * handleAdd()
 * hidden
 * hide()
 * bestSellings
 * */

const emptyState = {
  icon: null,
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
    this.setState({ icon: url, iconsHidden: true });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.icon || !this.state.title) {
      this.setState({ error: "Compila tutti i campi" });
    } else {
      this.setState(emptyState);
      this.props.hide();
      this.props.handleAdd({ icon: this.state.icon, title: this.state.title });
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
        <div id="addService-container" className="box popUp">
          <Icons
            addIcon={this.handleImageChange}
            hidden={this.state.iconsHidden}
            hideIcons={this.toggleIcons}
          />
          <HideCross hide={() => this.props.hide(null)} />
          <p id="addService-header">Aggiungi un servizio {this.props.type}</p>
          <p id="bestSelling-header">Best selling:</p>
          <div id="bestSelling-container" className="flex-col">
            <BestSellings bestSellings={this.props.bestSellings} />
          </div>
          <form
            id="addService-form"
            className="flex-line"
            onSubmit={this.handleSubmit}
          >
            <IconFields
              showIcons={this.toggleIcons}
              url={this.state.icon}
              removeIcon={() => {
                this.handleImageChange(null);
              }}
            />
            <input
              id="title-input"
              type="text"
              placeholder="nome servizio"
              onChange={this.handleServiceChange}
              value={this.state.title}
            />
          </form>
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
