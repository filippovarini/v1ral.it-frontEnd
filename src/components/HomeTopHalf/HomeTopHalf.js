import React, { Component } from "react";

import Logo from "./components/Logo";
import ChallengeButton from "./components/HomeButton";

import background from "../../images/home-background.jpg";

export class HomeTopHalf extends Component {
  render() {
    return (
      <div id="topHalf">
        <div id="home-background-container">
          <img src={background} alt="home backgroun" />
        </div>
        <div id="topHalf-content">
          <Logo />
          <ChallengeButton />
        </div>
      </div>
    );
  }
}

export default HomeTopHalf;
