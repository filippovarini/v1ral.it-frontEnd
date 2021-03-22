import React, { Component } from "react";

/** Form for shipment
 * @param handleChange
 */
export class ShipmentForm extends Component {
  render() {
    return (
      <form
        id="shipment-form"
        className="log-form"
        style={{ marginBottom: "0px" }}
      >
        <p className="form-header">SPEDIZIONE</p>
        <input
          type="text"
          placeholder="città"
          id="city"
          onChange={this.props.handleChange}
        />
        <input
          type="text"
          placeholder="provincia"
          id="province"
          onChange={this.props.handleChange}
        />
        <input
          type="text"
          placeholder="via"
          id="street"
          onChange={this.props.handleChange}
        />
        <input
          type="number"
          placeholder="CAP"
          id="postcode"
          onChange={this.props.handleChange}
        />
      </form>
    );
  }
}

export default ShipmentForm;
