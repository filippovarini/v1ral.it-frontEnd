import React, { Component } from "react";

import Navigator from "./components/Navigator";
import Statistics from "./components/Statistics/Statistics";
import Shops from "./components/Shops";
import "./bottomHalf.css";

// faq data
import shops from "../../../faqData/Shops";

export class BottomHalf extends Component {
  state = {
    navigatorIndex: 0
  };

  updateNav = i => this.setState({ navigatorIndex: i });

  render() {
    return (
      <div id="bottomHalf">
        <Navigator
          updateNav={this.updateNav}
          active={this.state.navigatorIndex}
        />
        <Statistics class={this.state.navigatorIndex === 0 ? null : "hidden"} />
        <Shops
          shops={shops}
          class={this.state.navigatorIndex === 1 ? null : "hidden"}
        />
      </div>
    );
  }
}

export default BottomHalf;
