import React, { Component } from "react";
import "./userProfileLogo.css";

/** Renders shop background image
 * @param url
 */
export class UserLogo extends Component {
  render() {
    return (
      <div
        id="user-logo-image"
        style={{ backgroundImage: `url(${this.props.url})` }}
      ></div>
    );
  }
}

export default UserLogo;
