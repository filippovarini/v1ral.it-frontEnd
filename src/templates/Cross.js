import React, { Component } from "react";

import colors from "../style/colors";

export class Cross extends Component {
  render() {
    return (
      <div
        id="cross-container"
        onClick={this.props.handleClick}
        style={{ color: colors.cross }}
      >
        <i class="fas fa-times"></i>
      </div>
    );
  }
}

export default Cross;
