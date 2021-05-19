import React, { Component } from "react";

import it from "../../../locales/it.json";

/** Form for configuring the info of the pass
 * @param handleChange
 * @param handleSubmit
 * @param toggleCheck1
 * @param stockNumber
 * @param initialPrice
 * @param stockMonthDuration
 */
export class ServiceForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    return (
      <form
        id="stock-form"
        className="input-container"
        onSubmit={this.handleSubmit}
      >
        <div id="stock-form-inputs">
          <div className="input-line">
            <label htmlFor="email">{it.stock_number}</label>
            <input
              type="number"
              id="stockNumber"
              value={this.props.stockNumber || ""}
              placeholder="e.g. 500"
              onChange={this.props.handleChange}
            />
          </div>
          <div className="input-line">
            <label htmlFor="password">{it.initial_price}</label>
            <input
              type="number"
              id="initialPrice"
              placeholder="e.g. 20"
              value={this.props.initialPrice || ""}
              onChange={this.props.handleChange}
            />
          </div>
          <div className="input-line">
            <label htmlFor="password">{it.stock_month_duration}</label>
            <select
              id="stockMonthDuration"
              onChange={this.props.handleChange}
              value={this.props.stockMonthDuration}
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
        <input type="submit" className="hidden" />
      </form>
    );
  }
}

export default ServiceForm;
