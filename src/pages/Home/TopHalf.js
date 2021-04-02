import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./home.css";

import ChallengeButton from "./homeComponents/Button/HomeButton";
import Header from "../../components/Header/Header";
import Countdown from "./homeComponents/CountDown/CountDown";
import Challenged from "../../components/InsertChallenger/Challenger";
import ValueIncrease from "./homeComponents/ValueIncrease/ValueIncrease";

export class HomeTopHalf extends Component {
  state = {
    challengerHidden: true,
    challengeLoading: false
  };

  toggleChallenger = () => {
    this.setState({ challengerHidden: !this.state.challengerHidden });
  };

  clickChallengeButton = () => {
    this.setState({ challengeLoading: true });
    fetch("/session")
      .then(res => res.json())
      .then(jsonRes => {
        if (!jsonRes.session.loginId) {
          this.setState({ challengeLoading: false });
          this.toggleChallenger();
        } else this.props.history.push("/shops");
      });
  };

  render() {
    return (
      <div id="topHalf">
        <Challenged
          hidden={this.state.challengerHidden}
          hide={this.toggleChallenger}
          alreadyAccountRedirection="/shops"
          successRedirection="/shops"
        />
        <Header class={this.props.class} />
        <div id="topHalf-banner-container">
          <ValueIncrease />
          <Countdown />
        </div>
        <ChallengeButton
          loading={this.state.challengeLoading}
          click={this.clickChallengeButton}
        />
      </div>
    );
  }
}

export default withRouter(HomeTopHalf);
