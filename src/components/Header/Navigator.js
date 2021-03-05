/* PROPS:
titles: [{name, function}] */

import React, { Component } from "react";
import "./header.css";

export class Navigator extends Component {
  render() {
    return (
      <div id="header-nav" className={this.props.class}>
        {this.props.titles.map(title => {
          return (
            <div key={title.name} className="header-nav-item">
              <p className="header-nav-title">{title.name}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Navigator;