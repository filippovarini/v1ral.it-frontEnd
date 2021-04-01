import React, { Component } from "react";
import "./viralTick.css";

/** Render viral tick
 * @param class big / small
 */
export class ViralUserTick extends Component {
  render() {
    return (
      <i id="viral-tick" className={`fas fa-check ${this.props.class}`}></i>
    );
  }
}

export default ViralUserTick;
