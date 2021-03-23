import React, { Component } from "react";
import "./placeForm.css";

export class PlaceForm extends Component {
  render() {
    return (
      <div>
        <div className="placeForm-input-container">
          <input
            type="text"
            className="short-width"
            value="Italia"
            disabled={true}
            readOnly={true}
          />
        </div>
        <div className="flex-line placeForm-input-container">
          <input
            type="text"
            id="city"
            placeholder="città"
            onChange={this.props.handleChange}
            className="long-width"
          />
          <input
            type="text"
            id="province"
            placeholder="provincia"
            onChange={this.props.handleChange}
            className="short-width"
          />
        </div>
        <div className="flex-line placeForm-input-container">
          <input
            type="text"
            id="street"
            placeholder="indirizzo"
            onChange={this.props.handleChange}
            className="long-width"
          />
          <input
            type="number"
            id="postcode"
            placeholder="CAP"
            onChange={this.props.handleChange}
            className="short-width"
          />
        </div>
      </div>
    );
  }
}

export default PlaceForm;
