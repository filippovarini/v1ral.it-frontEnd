import React, { Component } from "react";
import "./components.css";

// components
import CardPreview from "../../../components/CardPreview/CardPreview";
import Bill from "../../../components/Bill/Bill";

/** Handles card preview showing
 * Handles shipment editing and showing
 * @param defaultInfo user info
 * @param handleSubmit
 * @param shopsPrice
 */
export class UserLoggedInfo extends Component {
  state = {
    shipAgain: false
  };

  toggleShipAgain = () => {
    this.setState({ shipAgain: !this.state.shipAgain });
  };

  handleSubmit = () => {
    this.props.handleSubmit();
  };

  render() {
    const cart = [{ name: "Contagio", price: this.props.shopsPrice }];
    if (this.state.shipAgain) cart.push({ name: "Spedizione carta", price: 5 });
    return (
      <div id="user-logged-info">
        <p id="insertUser-header" style={{ marginTop: "50px" }}>
          Preview della nuova carta
        </p>
        <CardPreview
          challenger={this.props.defaultInfo.challenger}
          username={this.props.defaultInfo.username}
          static={true}
          url={this.props.defaultInfo.profileurl}
        />
        <div className="flex-line center">
          <p
            className={`new-button ${this.state.shipAgain ? "clicked" : ""}`}
            onClick={this.toggleShipAgain}
          >
            spediscimi la nuova carta (+ 5€)
          </p>
          {this.state.shipAgain ? (
            <i
              className="fas fa-check"
              style={{ marginLeft: "20px", color: "green" }}
            ></i>
          ) : null}
        </div>
        <p className="ship-cart-again"></p>
        <Bill items={cart} />
        <p id="checkout-confirm" className="button" onClick={this.handleSubmit}>
          {this.state.editing ? "SALVA E PROCEDI" : "PROCEDI"}
        </p>
      </div>
    );
  }
}

export default UserLoggedInfo;
