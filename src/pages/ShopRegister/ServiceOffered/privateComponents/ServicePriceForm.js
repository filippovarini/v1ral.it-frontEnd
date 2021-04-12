import React, { Component } from "react";

import it from "../../../../locales/it.json";

/** Form for configuring the info of the pass
 * @param handleChange
 * @param handleSubmit
 * @param defaultInfo default info to insert when pre-compiled
 * @param error
 */
export class ServiceForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    return (
      <form id="service-form" className="flex-col" onSubmit={this.handleSubmit}>
        <div className="shopRegister-input-container">
          <label htmlFor="email">{it.max_premiums}</label>
          <input
            type="number"
            id="maxPremiums"
            value={this.props.maxPremiums || ""}
            placeholder="e.g. 500"
            onChange={this.props.handleChange}
          />
        </div>
        <div className="shopRegister-input-container">
          <label htmlFor="password">{it.initial_price}</label>
          <input
            type="number"
            id="initialPrice"
            placeholder="e.g. 20"
            value={this.props.initialPrice || ""}
            onChange={this.props.handleChange}
          />
        </div>
        <div className="shopRegister-input-container">
          <label htmlFor="password">{it.pass_month_duration}</label>
          <select
            id="passExpiry"
            onChange={this.props.handleChange}
            value={this.props.passExpiry}
          >
            <option value="" disabled selected hidden>
              seleziona
            </option>
            <option value={3}>3 mesi</option>
            <option value={6}>6 mesi</option>
            <option value={12}>1 anno</option>
            <option value={24}>2 anni</option>
          </select>
        </div>
        <div id="shop-credentials-checkboxes">
          <div className="shop-credentials-checkbox flex-line">
            <input
              type="checkbox"
              className="check-input"
              id="termsAndPrivacyCheck"
              onChange={this.props.toggleCheck1}
            />
            <label htmlFor="termsAndPrivacyCheck" className="check-label">
              {it.shop_register_priviledges_checkboxes}
            </label>
          </div>
        </div>
        <p className="form-error">{this.props.error}</p>
        <input type="submit" className="hidden" />
      </form>
    );
  }
}

export default ServiceForm;
