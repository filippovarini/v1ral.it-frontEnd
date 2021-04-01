import React, { Component } from "react";
import "./components.css";

import it from "../../../locales/it.json";

// components
import CardPreview from "../../../components/CardPreview/CardPreview";

/** Handles card preview showing.
 * Button in userCheckout
 * @param defaultInfo user info
 * @param shipAgain
 * @param toggleShipAgain
 */
export class UserLoggedInfo extends Component {
  render() {
    return (
      <div id="user-logged-info">
        <p id="insertUser-header" style={{ marginTop: "50px" }}>
          {it.checkout_new_card_preview}
        </p>
        <CardPreview
          challenger={this.props.defaultInfo.challenger}
          username={this.props.defaultInfo.username}
          static={true}
          url={
            this.props.defaultInfo.profileurl ||
            this.props.defaultInfo.profileUrl
          }
        />
        {this.props.shipAgainDisabled ? null : (
          <div className="flex-line center">
            <p
              id="ship-again-button"
              className={`button small style2 ${
                this.props.shipAgain ? "clicked" : ""
              }`}
              onClick={this.props.toggleShipAgain}
            >
              {it.resend_me_the_card}
            </p>
            {this.props.shipAgain ? (
              <i
                className="fas fa-check"
                style={{ marginLeft: "20px", color: "green" }}
              ></i>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default UserLoggedInfo;
