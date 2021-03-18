import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./home.css";

import ChallengeButton from "./homeComponents/Button/HomeButton";
import Header from "../../components/Header/Header";
import Countdown from "./homeComponents/CountDown/CountDown";
import Challenged from "./homeComponents/Challenged/Challenged";

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
        <Challenged
          hidden={this.state.challengedHidden}
          hide={this.toggleChallenged}
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
        <ChallengeButton show={this.toggleChallenged} />
      </div>
    );
  }
}

export default withRouter(HomeTopHalf);
