import React, { Component } from "react";
import { Link } from "react-router-dom";

import it from "../../locales/it.json";

// components
import TopHalf from "./TopHalf";
import BottomHalf from "./BottomHalf";
import Explanaiton from "./homeComponents/Explanaiton/Explanaiton";
import Countdown from "./homeComponents/CountDown/CountDown";
import ValueIncrease from "./homeComponents/ValueIncrease/ValueIncrease";

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
        <div id="shop-prompt-container" className="flex-line">
          <p id="shop-prompt-title">{it.shop_register_prompt}</p>
          <Link
            to="/shop/register/bio"
            id="shop-prompt-button"
            className="button"
          >
            {it.shop_register_prompt_button}
          </Link>
        </div>
        <Explanaiton />
      </div>
    );
  }
}

export default Home;
