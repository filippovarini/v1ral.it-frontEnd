import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./home.css";

import ChallengeButton from "./homeComponents/Button/HomeButton";
import Header from "../../components/Header/Header";

/** Home top half. Can see shops even without challenger */
export class HomeTopHalf extends Component {
  render() {
    return (
      <div id="topHalf">
        <Header class="topHalf" />
        <ChallengeButton />
      </div>
    );
  }
}

export default withRouter(HomeTopHalf);
