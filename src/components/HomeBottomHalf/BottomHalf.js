import React, { Component } from "react";

import Navigator from "./components/Navigator";
import Statistics from "./components/Statistics";

export class BottomHalf extends Component {
  render() {
    return (
      <div id="bottomHalf">
        <Navigator />
        <Statistics />
      </div>
    );
  }
}

export default BottomHalf;
