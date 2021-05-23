import React, { Component } from "react";
import errorHandler from "../../functions/errorHandler";
import "./validateStripeAccount.css";

import goToDashboard from "../../functions/goToDashboard";
import SmallLoading from "../Loading/SmallLoading";

import it from "../../locales/it.json";

/** Button to validate stripe connected account (redirection to dashboard)
 * @param shopId
 * @param redirectPath
 * @param connectedId?
 */
export class ValidateStripeAccount extends Component {
  state = {
    loading: false
  };

  goToDashboard = () => {
    this.setState({ loading: true });
    goToDashboard(this.props.redirectPath, this.props.connectedId);
  };

  connectAccount = () => {
    this.setState({ loading: true });
    fetch("/transaction/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        id: this.props.shopId,
        returnPath: this.props.redirectPath,
        refreshPath: this.props.redirectPath
      })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          window.location = jsonRes.url;
        } else {
          alert(jsonRes.message);
          if (jsonRes.serverError) errorHandler.serverError(jsonRes);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      <div id="validate-account" className="body-box dark-box-container">
        <p className="body-box-header dark">
          {this.props.connectedId
            ? it.validate_stripe_header
            : it.connect_stripe_header}
          <i id="warning-icon" className="fas fa-exclamation-circle"></i>
        </p>
        <p className="body-box-text dark-box-text">
          {this.props.connectedId
            ? it.validate_stripe_text
            : it.connect_stripe_text}
        </p>

        <p id="validate-account-warning">
          {this.props.connectedId
            ? it.validate_stripe_warning
            : it.connect_stripe_warning}
        </p>

        {this.state.loading ? (
          <div className="validate-account-button-container">
            <SmallLoading class="white" />
          </div>
        ) : (
          <div className="validate-account-button-container">
            <p
              id="validate-account-button"
              className="button small"
              onClick={
                this.props.connectedId
                  ? this.goToDashboard
                  : this.connectAccount
              }
            >
              {this.props.connectedId
                ? it.validate_stripe_button
                : it.connect_stripe_button}
            </p>
            <div className="payment-secure flex-line">
              <i className="fas fa-lock"></i>
              <p>pagamenti sicuri con</p>
              <i className="fab fa-stripe"></i>
            </div>
          </div>
        )}

        <p id="validate-account-step-counter">
          step {this.props.connectedId ? 2 : 1}/2
        </p>
      </div>
    );
  }
}

export default ValidateStripeAccount;
