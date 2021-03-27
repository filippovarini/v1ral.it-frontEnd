import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./cart.css";

/** Cart info, with button for checkout
 * @param: product
 * @param: removeItem()
 */

export class ShopCartItem extends Component {
  render() {
    return (
      <div className="cart-item-container">
        <div className="cart-item-image">
          <img alt="Imagine del negozio" src={this.props.product.images[0]} />
        </div>
        <div className="cart-item-info">
          <p className="cart-item-name">{this.props.product.name}</p>
          <p className="cart-item-description">
            {this.props.product.description.slice(0, 30)}...
          </p>
          <p
            className="cart-item-remove"
            onClick={() => this.props.removeItem(this.props.product.id)}
          >
            rimuovi
          </p>
          <p className="cart-item-price">{this.props.product.price} €</p>
        </div>
      </div>
    );
  }
}

export default withRouter(ShopCartItem);
