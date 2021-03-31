import React, { Component } from "react";
import "./validateStripeAccount.css";

import errorHandler from "../../functions/errorHandler";

import it from "../../locales/it.json";

/** Button to validate stripe connected account (redirection to dashboard)
 * @param toggleLoading
 * @param connectedId
 * @param redirectPath
 */
export class ValidateStripeAccount extends Component {
  goToDashboard = () => {
    this.props.toggleLoading();
    fetch("/transaction/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        redirectPath: this.props.redirectPath,
        connectedId: this.props.connectedId
      })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) window.location = jsonRes.url;
        else {
          alert(jsonRes.message);
          errorHandler.serverError(jsonRes);
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
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
