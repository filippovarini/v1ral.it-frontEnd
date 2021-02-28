import React, { Component } from "react";

import Logo from "./components/Logo";
import ChallengeButton from "./components/HomeButton";
import Navigator from "./components/Navigator";

//popups
import Challenged from "../../../components/PopUps/Challenged/Challenged";

import background from "../../../images/home-background.jpg";

export class HomeTopHalf extends Component {
  state = {
    challengedHidden: true
  };

  toggleChallenged = () => {
    this.setState({ challengedHidden: !this.state.challengedHidden });
  };

  render() {
    return (
      <div id="topHalf">
        <div id="home-background-container">
          <img src={background} alt="home backgroun" />
        </div>
        <Challenged
          class={this.state.challengedHidden ? "hidden" : null}
          hide={this.toggleChallenged}
        />
        <div id="topHalf-content">
          <div id="topHalf-header">
            <Logo />
            <Navigator />
          </div>
          <ChallengeButton show={this.toggleChallenged} />
        </div>
      </div>
    );
  }
}

export default HomeTopHalf;
