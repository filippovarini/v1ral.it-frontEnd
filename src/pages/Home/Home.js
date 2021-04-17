import React, { Component } from "react";

// components
import TopHalf from "./TopHalf";
import BottomHalf from "./BottomHalf";
import Explanaiton from "./homeComponents/Explanaiton/Explanaiton";
import Countdown from "./homeComponents/CountDown/CountDown";
import ValueIncrease from "./homeComponents/ValueIncrease/ValueIncrease";
import ShopPrompt from "./homeComponents/ShopPrompt.js";

export class Home extends Component {
  render() {
    return (
      <div id="home-container">
        <TopHalf />
        <div id="home-banner-container">
          <ValueIncrease />
          <Countdown />
        </div>
        <BottomHalf />
        <ShopPrompt />
        <Explanaiton />
      </div>
    );
  }
}

export default Home;
