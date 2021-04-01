import React, { Component } from "react";
import "./validateStripeAccount.css";

import goToDashboard from "../../functions/goToDashboard";

import it from "../../locales/it.json";

/** Button to validate stripe connected account (redirection to dashboard)
 * @param toggleLoading
 * @param connectedId
 * @param redirectPath
 */
export class ValidateStripeAccount extends Component {
  goToDashboard = () => {
    this.props.toggleLoading();
    goToDashboard(this.props.redirectPath, this.props.connectedId);
  };

  render() {
    return (
      <div id="validate-stripe-account" className="flex-line">
        <p id="validate-stripe-account-text">
          {it.shop_charges_not_enabled_text}
        </p>
        <p
          id="validate-stripe-account-button"
          className="button"
          onClick={this.goToDashboard}
        >
          {it.shop_charges_not_enabled_button}
        </p>
      </div>
    );
  }
}

export default ValidateStripeAccount;
