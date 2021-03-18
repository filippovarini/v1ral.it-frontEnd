import React, { Component } from "react";

// components
import TopHalf from "./TopHalf";
import BottomHalf from "./BottomHalf";

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
      </div>
    );
  }
}

export default Home;
