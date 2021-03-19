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
  componentDidMount = () => {
    fetch("/page/header")
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success)
          this.setState({ userProfile: jsonRes.userProfile });
      })
      .catch(e => {
        console.log(e);
        this.props.history.push("/error");
      });
  };
  render() {
    return (
      <div id="header" className={this.props.class}>
        <Logo />
        <Navigator
          loggedProfile={
            this.state.userProfile
              ? {
                  url: this.state.userProfile,
                  handleClick: () => alert("click")
                }
              : false
          }
          titles={this.props.titles}
        />
      </div>
    );
  }
}

export default withRouter(Header);
