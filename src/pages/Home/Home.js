import React, { Component } from "react";

// components
import TopHalf from "./Top/HomeTopHalf";
import BottomHalf from "./Bottom/BottomHalf";

export class Home extends Component {
  render() {
    return (
      <div id="home-container">
        <TopHalf />
        <BottomHalf />
      </div>
    );
  }
}

export default Home;
