import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./logo.css";

import logoImg from "../../images/logo-long.png";

export class Logo extends Component {
  render() {
    return (
      <img
        onClick={() => this.props.history.push("/")}
        src={logoImg}
        alt="logo"
        id="logo"
      />
    );
  }
}

export default withRouter(Logo);
