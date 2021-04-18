import React, { Component } from "react";
import "./logo.css";

import logoImg from "../../images/logo-long.png";

export class Logo extends Component {
  render() {
    return (
      <img
        onClick={() => (window.location = "/")}
        src={logoImg}
        alt="logo"
        id="logo"
      />
    );
  }
}

export default Logo;
