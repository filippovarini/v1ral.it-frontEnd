/* PROPS:
titles: [{name, handleClick}] */

import React, { Component } from "react";
import { connect } from "react-redux";
import "./header.css";

export class Navigator extends Component {
  render() {
    const titles = this.props.user.name
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
        {this.props.user.name ? (
          <div
            key={-1}
            className="header-nav-item"
            onClick={() => alert("click")}
          >
            <img
              src={this.props.user.userProfile}
              className="header-nav-title header-nav-image"
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Navigator);
