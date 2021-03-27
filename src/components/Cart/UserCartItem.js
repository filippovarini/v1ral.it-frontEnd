import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./cart.css";

/** Cart info, with button for checkout
 * @param: shop
 * @param: removeItem()
 */

export class UserCartItem extends Component {
  render() {
    return (
      <div className="cart-item-container">
        <div className="cart-item-image">
          <img alt="Imagine del negozio" src={this.props.shop.logourl} />
        </div>
        <div className="cart-item-info">
          <p className="cart-item-name">{this.props.shop.name}</p>
          <p className="cart-item-place">
            {this.props.shop.city}, {this.props.shop.province}
          </p>
          <p
            className="cart-item-remove"
            onClick={() => this.props.removeItem(this.props.shop.id)}
          >
            rimuovi
          </p>
          <p className="cart-item-price">{this.props.shop.currentprice} €</p>
        </div>
      </div>
    );
  }
}

export default withRouter(UserCartItem);
