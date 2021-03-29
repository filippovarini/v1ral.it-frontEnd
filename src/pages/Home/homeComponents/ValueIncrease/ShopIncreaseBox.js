import React, { Component } from "react";

/** Renders little shop box
 * @param shop
 */
export class ShopIncreaseBox extends Component {
  render() {
    return this.props.shop ? (
      <div id="shop-increase-box">
        <div id="shop-increase-header" className="flex-line">
          <img src={this.props.shop.logourl} alt="Imagine impresa" />
          <p id="shop-increase-box-name">{this.props.shop.name}</p>
        </div>
        <div id="shop-increase-prices" className="flex-line">
          <p id="shop-increase-box-current">€ {this.props.shop.currentprice}</p>
          <p id="shop-increase-box-increase">
            +{" "}
            {Math.ceil(
              (this.props.shop.currentprice / this.props.shop.initialprice -
                1) *
                100
            )}
            %
          </p>
        </div>
      </div>
    ) : null;
  }
}

export default ShopIncreaseBox;
