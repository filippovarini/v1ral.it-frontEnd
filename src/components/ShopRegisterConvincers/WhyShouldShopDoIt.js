import React, { Component } from "react";
import "./shopRegisterConvincers.css";

/** Explains why the shop should do the challenge
 * @param hide
 * @param hidden
 */
export class WhyShouldShopDoIt extends Component {
  render() {
    return (
      <div
        className="popUp-background"
        style={this.props.hidden ? { display: "none" } : null}
      >
        <div id="shopHIW" className="popUp convincer-container">
          why?
          <i className="fas fa-times hide-cross" onClick={this.props.hide}></i>
        </div>
      </div>
    );
  }
}

export default WhyShouldShopDoIt;
