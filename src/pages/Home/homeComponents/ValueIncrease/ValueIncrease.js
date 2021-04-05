import React, { Component } from "react";
import "./valueIncrease.css";

import errorHandler from "../../../../functions/errorHandler";
import getShopsForBanner from "../../../../functions/getShopsForBanner";
import it from "../../../../locales/it.json";

import ShopIncreaseBox from "./ShopIncreaseBox";

export class ValueIncrease extends Component {
  state = {
    shops: []
  };

  // 15 shops to be put into the slider
  componentDidMount = () => {
    fetch("/page/home/priceIncrease")
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          this.setState({
            shops: getShopsForBanner(jsonRes.shops)
          });
        } else if (jsonRes.serverError) errorHandler.serverError(jsonRes);
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    return (
      <div id="value-increase-general" className="topHalf-banner">
        <p id="value-increase-header">{it.shop_price_increase}:</p>
        <div id="value-increase-wrapper">
          <div id="value-increase" className="flex-line">
            {this.state.shops.map((shop, i) => (
              <ShopIncreaseBox key={i} shop={shop} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ValueIncrease;
