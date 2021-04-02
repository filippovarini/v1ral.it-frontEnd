import React, { Component } from "react";
import { Link } from "react-router-dom";

import it from "../../locales/it.json";

// components
import TopHalf from "./TopHalf";
import BottomHalf from "./BottomHalf";
import Explanaiton from "./homeComponents/Explanaiton/Explanaiton";

// for scrolling header
const offset = 40;

export class Home extends Component {
  state = {
    headerTopHalf: true
  };

  handleScroll = () => {
    if (window.pageYOffset > offset && this.state.headerTopHalf) {
      this.setState({ headerTopHalf: false });
    } else if (window.pageYOffset <= offset && !this.state.headerTopHalf) {
      this.setState({ headerTopHalf: true });
    }
  };

  render() {
    return (
      <div id="home-container" onWheel={this.handleScroll}>
        <TopHalf class={this.state.headerTopHalf ? "topHalf" : null} />
        <BottomHalf />
        <div id="howItWorks-container"></div>
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
