import React, { Component } from "react";

/** Static display of the shipment info
 * @param defaultInfo
 */
export class ShipmentStatic extends Component {
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
          disabled={true}
          placeholder="città"
          id="city"
          value={this.props.defaultInfo.city}
          onChange={this.props.handleChange}
        />
        <input
          type="text"
          disabled={true}
          placeholder="provincia"
          id="province"
          value={this.props.defaultInfo.province}
          onChange={this.props.handleChange}
        />
        <input
          type="text"
          disabled={true}
          placeholder="via"
          id="street"
          value={this.props.defaultInfo.street}
          onChange={this.props.handleChange}
        />
        <input
          type="number"
          disabled={true}
          placeholder="CAP"
          id="postcode"
          value={this.props.defaultInfo.postcode}
          onChange={this.props.handleChange}
        />
      </form>
    );
  }
}

export default ShipmentStatic;
