import React, { Component } from "react";
import "./valueIncrease.css";

import errorHandler from "../../../../functions/errorHandler";

import ShopIncreaseBox from "./ShopIncreaseBox";

export class ValueIncrease extends Component {
  state = {
    shops: [],
    wrapperStart: true
  };

  componentDidMount = () => {
    fetch("/page/home/priceIncrease")
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          window.setInterval(
            () => this.setState({ wrapperStart: !this.state.wrapperStart }),
            20000
          );
          this.setState({
            shops: [...jsonRes.shops, ...jsonRes.shops, ...jsonRes.shops],
            wrapperStart: false
          });
        } else if (jsonRes.serverError) errorHandler.serverError(jsonRes);
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  formatShopPriceIncrease = () => {
    return this.state.shops.map(shop => {
      return {
        current: shop.currentprice,
        name: shop.name,
        logourl: shop.logourl,
        increase: Math.ceil((shop.currentprice / shop.initialprice - 1) * 100)
      };
    });
  };

  render() {
    return (
      <div id="value-increase-general" className="topHalf-banner">
        <p id="value-increase-header">Aumento valore:</p>
        <div id="value-increase-wrapper">
          <div
            id="value-increase"
            className={`flex-line ${this.state.wrapperStart ? "start" : "end"}`}
          >
            {this.formatShopPriceIncrease(this.state.shops)
              .sort((a, b) => b.increase - a.increase)
              .map((shop, i) => (
                <ShopIncreaseBox key={i} shop={shop} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ValueIncrease;
