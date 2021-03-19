/* PROPS:
titles: [{name, handleClick}] */

import React, { Component } from "react";
import "./header.css";

export class Navigator extends Component {
  render() {
    const titles = this.props.loggedProfile
      ? this.props.titles.filter(
          title => title.name !== "login" && title.name !== "portale aziende"
        )
      : this.props.titles;
    return (
      <div id="header-nav" className={this.props.class}>
        {titles.map((title, i) => {
          return (
            <div
              key={i}
              className="header-nav-item"
              onClick={title.handleClick}
            >
              <p className="header-nav-title">{title.name}</p>
            </div>
          );
        })}
        {this.props.loggedProfile ? (
          <div
            key={-1}
            className="header-nav-item"
            onClick={this.props.loggedProfile.handleClick}
          >
            <img
              src={this.props.loggedProfile.url}
              className="header-nav-title header-nav-image"
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Navigator;
