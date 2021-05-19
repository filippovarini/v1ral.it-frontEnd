import React, { Component } from "react";

/** Renders box info in body box
 * @param icon
 * @param data
 * @param title
 */
export class StatsBox extends Component {
  render() {
    return (
      <div className="dark-box">
        <div className="dark-box-header-container flex-line">
          <p className="dark-box-data dark-box-text">{this.props.data}</p>
          {this.props.icon}
        </div>
        <p className="dark-box-title dark-box-text">{this.props.title}</p>
        <p className="dark-box-description dark-box-text">
          {this.props.description}
        </p>
      </div>
    );
  }
}

export default StatsBox;
