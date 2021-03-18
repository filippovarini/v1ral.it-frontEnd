import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./home.css";

import ChallengeButton from "./homeComponents/Button/HomeButton";
import Header from "../../components/Header/Header";
import Countdown from "./homeComponents/CountDown/CountDown";
import Challenged from "../../components/InsertChallenger/Challenger";

export class HomeTopHalf extends Component {
  state = {
    challengerHidden: true
  };

  toggleChallenger = () => {
    this.setState({ challengerHidden: !this.state.challengerHidden });
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
        <Header
          class={this.props.class}
          titles={[
            { name: "vision" },
            { name: "diventa virale" },
            { name: "login" },
            {
              name: "portale aziende",
              handleClick: () => this.props.history.push("shop/register/bio")
            }
          ]}
        />
        <Countdown />
        <ChallengeButton show={this.toggleChallenger} />
      </div>
    );
  }
}

export default withRouter(HomeTopHalf);
