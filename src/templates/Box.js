/* Props:
- content
- hidable?
 */
import React, { Component } from "react";
import "./templates.css";

import DeleteCross from "./Cross";

import colors from "../style/colors";

export class Box extends Component {
  state = {
    hidden: false
  };

  render() {
    return (
      <div
        style={this.state.hidden ? { display: "none" } : null}
        style={{ background: colors.boxBackground }}
        id="box-container"
      >
        {// show cross if hidable component
        this.props.hidable ? (
          <DeleteCross
            handleClick={() => {
              this.setState({ hidden: !this.state.hidden });
            }}
          />
        ) : null}

        {this.props.content}
      </div>
    );
  }
}

export default Box;
