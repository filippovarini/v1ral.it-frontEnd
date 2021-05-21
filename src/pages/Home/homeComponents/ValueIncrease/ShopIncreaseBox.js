import React, { Component } from "react";

/** Renders little shop box
 * @param shop
 */
export class ShopIncreaseBox extends Component {
  render() {
    return this.props.shop ? (
      <div id="shop-increase-box">
        <div id="shop-increase-header" className="flex-line">
          <img src={this.props.shop.logo} alt="Imagine impresa" />
          <p id="shop-increase-box-name">{this.props.shop.name}</p>
        </div>
        <div id="shop-increase-prices" className="flex-line">
          <p id="shop-increase-box-current">€ {this.props.shop.current}</p>
          <p id="shop-increase-box-increase">+ {this.props.shop.increase}%</p>
        </div>
      </div>
    ) : null;
  }
}

export default ShopIncreaseBox;
