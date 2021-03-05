/* PROPS:
- class
- titles [{name, function}] */

import React, { Component } from "react";
import "./header.css";

import Navigator from "./Navigator";
import Logo from "../Logo/Logo";

export class Header extends Component {
  render() {
    return (
      <div id="header" className={this.props.class}>
        <Logo />
        <Navigator titles={this.props.titles} />
      </div>
    );
  }
}

export default Header;
