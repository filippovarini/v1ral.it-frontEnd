import React, { Component } from "react";
import "./percentageLoader.css";

/** Renders a loader with percentage
 * @param percentage
 */
export class PercentaceLoader extends Component {
  render() {
    return (
      <div id="percentage-loader-wrapper">
        <div
          id="percentage-loader"
          style={{ width: `${this.props.percentage}%` }}
        ></div>
      </div>
    );
  }
}

export default PercentaceLoader;
