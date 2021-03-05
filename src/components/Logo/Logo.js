import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./logo.css";

export class Logo extends Component {
  render() {
    return (
      <div>
        <p id="logo" onClick={() => this.props.history.push("/")}>
          [logo here]
        </p>
      </div>
    );
  }
}

export default withRouter(Logo);
