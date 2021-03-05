/* PROPS
updateNav(int i)
active
titles: [] */

import React, { Component } from "react";
import "./navigator.css";

export class Navigator extends Component {
  render() {
    const titles = this.props.titles;
    return (
      <div id="nav">
        {titles.map((title, i) => {
          return (
            <div
              key={i}
              className="nav-container"
              onClick={() => this.props.updateNav(i)}
              style={
                this.props.active === i ? { textDecoration: "underline" } : null
              }
            >
              <p className="nav-title">{title}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Navigator;
