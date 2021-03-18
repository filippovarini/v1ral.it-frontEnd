import React, { Component } from "react";

import Navigator from "../../components/Navigator/Navigator";
import Statistics from "./homeComponents/Statistics/Statistics";
import Shops from "./homeComponents/Shops";
import Cases from "./homeComponents/Cases";
import "./home.css";

export class BottomHalf extends Component {
  state = {
    navigatorIndex: 0
  };

  updateNav = i => this.setState({ navigatorIndex: i });

  render() {
    return (
      <div id="bottomHalf">
        <div id="bottomHalf-nav-container">
          <Navigator
            updateNav={this.updateNav}
            active={this.state.navigatorIndex}
            titles={["Statistiche", "Focolai", "Positivi"]}
          />
        </div>
        <Statistics class={this.state.navigatorIndex === 0 ? null : "hidden"} />
        <Shops class={this.state.navigatorIndex === 1 ? null : "hidden"} />
        <Cases class={this.state.navigatorIndex === 2 ? null : "hidden"} />
      </div>
    );
  }
}

export default BottomHalf;
