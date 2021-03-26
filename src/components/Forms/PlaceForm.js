import React, { Component } from "react";
import "./forms.css";

/** Form for place
 * @param city, province, street, postcode (for static form)
 * @param handleChange
 * @param header?
 * @param readOnly?
 */
export class PlaceForm extends Component {
  render() {
    return (
      <div>
        <p className="form-header">{this.props.header}</p>
        <div className="form-input-container">
          <input
            type="text"
            className="short-width"
            value="Italia"
            autoComplete="off"
            disabled={true}
            readOnly
          />
        </div>
        <div className="flex-line form-input-container">
          <input
            type="text"
            id="city"
            autoComplete="off"
            placeholder="città"
            value={this.props.city || ""}
            onChange={this.props.handleChange}
            className="long-width"
            disabled={this.props.readOnly}
          />
          <input
            type="text"
            id="province"
            autoComplete="off"
            placeholder="provincia"
            value={this.props.province || ""}
            onChange={this.props.handleChange}
            disabled={this.props.readOnly}
            className="short-width"
          />
        </div>
        <div className="flex-line form-input-container">
          <input
            type="text"
            id="street"
            autoComplete="off"
            value={this.props.street || ""}
            placeholder="indirizzo"
            onChange={this.props.handleChange}
            className="long-width"
            disabled={this.props.readOnly}
          />
          <input
            type="number"
            id="postcode"
            autoComplete="off"
            value={this.props.postcode || ""}
            placeholder="CAP"
            onChange={this.props.handleChange}
            className="short-width"
            disabled={this.props.readOnly}
          />
        </div>
      </div>
    );
  }
}

export default PlaceForm;
