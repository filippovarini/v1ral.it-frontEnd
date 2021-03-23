import React, { Component } from "react";
import "./placeForm.css";

/** Form for place
 * @param city, province, street, postcode (for static form)
 * @param handleChange
 */
export class PlaceForm extends Component {
  render() {
    return (
      <div>
        <div className="placeForm-input-container">
          <input
            type="text"
            className="short-width"
            value="Italia"
            autoComplete="off"
            disabled={true}
            readOnly={true}
          />
        </div>
        <div className="flex-line placeForm-input-container">
          <input
            type="text"
            id="city"
            autoComplete="off"
            placeholder="città"
            value={this.props.city || ""}
            onChange={this.props.handleChange}
            className="long-width"
          />
          <input
            type="text"
            id="province"
            autoComplete="off"
            placeholder="provincia"
            value={this.props.province || ""}
            onChange={this.props.handleChange}
            className="short-width"
          />
        </div>
        <div className="flex-line placeForm-input-container">
          <input
            type="text"
            id="street"
            autoComplete="off"
            value={this.props.street || ""}
            placeholder="indirizzo"
            onChange={this.props.handleChange}
            className="long-width"
          />
          <input
            type="number"
            id="postcode"
            autoComplete="off"
            value={this.props.postcode || 0}
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
