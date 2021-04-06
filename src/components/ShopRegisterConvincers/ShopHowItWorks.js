import React, { Component } from "react";
import "./shopRegisterConvincers.css";

/** Explains how the challenge works */
export class ShopHowItWorks extends Component {
  render() {
    return (
      <div
        className="popUp-background"
        style={this.props.hidden ? { display: "none" } : null}
      >
        <div id="shopHIW" className="popUp convincer-container">
          how it works
          <i className="fas fa-times hide-cross" onClick={this.props.hide}></i>
        </div>
      </div>
    );
  }
}

export default ShopHowItWorks;
