import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./cart.css";

import Loading from "../Loading/Loading";
import UserCartItem from "./UserCartItem";
import ShopCartItem from "./ShopCartItem";

/** Cart info, with button for checkout
 * @param items
 * @param loading
 * @param removeItem function to remove item from cart
 * @param isShop boolean representing whether the logged user is a shop or a
 * normal user
 */

export class Cart extends Component {
  render() {
    const redirectPage = this.props.isShop
      ? "/shop/checkout"
      : "/user/checkout";
    const body =
      this.props.items && this.props.items.length > 0 ? (
        <div id="cart-items">
          {this.props.items.map((item, i) => {
            return this.props.isShop ? (
              <ShopCartItem
                product={item}
                key={i}
                removeItem={this.props.removeItem}
              />
            ) : (
              <UserCartItem
                shop={item}
                key={i}
                removeItem={this.props.removeItem}
              />
            );
          })}
        </div>
      ) : (
        <div>Il carrello è vuoto</div>
      );
    return (
      <div id="cart" className="box">
        <p id="cart-header">carrello</p>
        {this.props.loading ? <Loading /> : body}
        <p
          id="cart-button"
          className="button"
          onClick={() => this.props.history.push(redirectPage)}
        >
          checkout
        </p>
      </div>
    );
  }
}

export default withRouter(Cart);
