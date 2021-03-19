/* PROPS:
- class
- titles [{name, function}] */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./header.css";

import Navigator from "./Navigator";
import Logo from "../Logo/Logo";

export class Header extends Component {
  state = {
    userProfile: null
  };

  render() {
    return (
      <div id="header" className={this.props.class}>
        <Logo />
        <Navigator titles={this.props.titles} />
      </div>
    );
  }
}

export default withRouter(Header);
