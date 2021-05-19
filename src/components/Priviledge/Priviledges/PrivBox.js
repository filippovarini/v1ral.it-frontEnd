import React, { Component } from "react";

/** Render stat box (dark mode) with:
 * @param priv
 * @param removePriv?
 */
export class PrivBox extends Component {
  render() {
    return (
      <div className="dark-box priv-box">
        {this.props.removePriv ? (
          <i
            onClick={() => this.props.removePriv(this.props.priv)}
            className="fas fa-times hide-cross"
          ></i>
        ) : null}
        <div className="dark-box-header-container">
          <p id="priv-title" className="dark-box-text">
            {this.props.priv.title}
          </p>
        </div>
        <p className="dark-box-description dark-box-text">
          {this.props.priv.description}
        </p>
      </div>
    );
  }
}

export default PrivBox;
