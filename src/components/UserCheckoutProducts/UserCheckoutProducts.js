import React, { Component } from "react";
import "./userCheckoutProducts.css";

export class UserCheckoutProducts extends Component {
  render() {
    return (
      <div id="user-checkout-products" className="box centering">
        <p id="user-checkout-products-text">
          Show user checkout products here (tick and card)
        </p>
      </div>
    );
  }
}

export default UserCheckoutProducts;
