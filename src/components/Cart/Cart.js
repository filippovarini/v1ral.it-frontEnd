import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./cart.css";

import Loading from "../Loading/Loading";

/** Cart info, with button for checkout
 * @param: shops: info of all shops
 * @param: loading
 * @param: removeItem()
 */

export class Cart extends Component {
  render() {
    console.log(this.props.shops);
    const body =
      this.props.shops && this.props.shops.length > 0 ? (
        <div id="cart-items">
          {this.props.shops.map((shop, i) => {
            return (
              <div className="cart-item-container" key={i}>
                <div className="cart-item-image">
                  <img alt="Imagine del negozio" src={shop.logourl} />
                </div>
                <div className="cart-item-info">
                  <p className="cart-item-name">{shop.name}</p>
                  <p className="cart-item-place">
                    {shop.city}, {shop.province}
                  </p>
                  <p
                    className="cart-item-remove"
                    onClick={() => this.props.removeItem(shop.id)}
                  >
                    rimuovi
                  </p>
                  <p className="cart-item-price">€{shop.currentprice}</p>
                </div>
              </div>
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
          onClick={() => this.props.history.push("/checkout")}
        >
          checkout
        </p>
      </div>
    );
  }
}

export default withRouter(Cart);
