import React, { Component } from "react";

/** Returns different service body depending on whether it is goal or not
 * title
 * otherData (url or price for goal)
 * type
 */
export class serviceBody extends Component {
  render() {
    const service = (
      <div className="serviceBox-container">
        <img
          className="serviceBox-icon"
          src={this.props.otherData}
          alt="icona servizio"
        />
        <p className="serviceBox-title">{this.props.title}</p>
      </div>
    );

    const goal = (
      <div className="serviceBox-container serviceBox-goal">
        <p className="serviceBox-title">{this.props.title}</p>
        <p className="serviceBox-price">{this.props.otherData}</p>
      </div>
    );

    const body = this.props.type === "goal" ? goal : service;

    return body;
  }
}

export default serviceBody;
