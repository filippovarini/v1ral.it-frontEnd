import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import ChallengeButton from "./components/HomeButton";
import Header from "../../../components/Header/Header";

//popups
import Challenged from "../../../components/PopUps/Challenged/Challenged";

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
        <ChallengeButton show={this.toggleChallenged} />
      </div>
    );
  }
}

export default withRouter(HomeTopHalf);
