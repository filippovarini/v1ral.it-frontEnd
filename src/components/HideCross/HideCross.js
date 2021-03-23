import React, { Component } from "react";

/**
 * PROPS:
 * hide
 */
export class HideCross extends Component {
  render() {
    return (
      <div
        className={"hide-cross " + this.props.class}
        onClick={this.props.hide}
      >
        <i className="fas fa-times"></i>
      </div>
    );
  }
}

export default HideCross;
