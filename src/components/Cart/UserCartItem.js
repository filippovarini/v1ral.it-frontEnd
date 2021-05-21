import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./cart.css";

import it from "../../locales/it.json";

import ShopBackground from "../ShopBackgroundImage/ShopBackground";

/** Cart info, with button for checkout
 * @param: shop
 * @param: removeItem()
 */

export class UserCartItem extends Component {
  render() {
    return (
      <div className="cart-item-container">
        <div className="cart-item-image">
          <ShopBackground url={this.props.shop.background} />
        </div>
        <div className="cart-item-info">
          <p className="cart-item-name">{this.props.shop.name}</p>
          <p className="cart-item-place">
            {this.props.shop.city}, {this.props.shop.province}
          </p>
          {this.props.shop.cartType === "renewal" ? (
            <p id="cart-item-renew" className="small-data-box">
              {it.cart_item_renew}
            </p>
          ) : null}
          <p
            className="cart-item-remove"
            onClick={() => this.props.removeItem(this.props.shop.id)}
          >
            rimuovi
          </p>
          <p className="cart-item-price">
            {this.props.shop.cartType === "renewal"
              ? this.props.shop.renewalPrice
              : this.props.shop.currentPrice}{" "}
            €
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(UserCartItem);
