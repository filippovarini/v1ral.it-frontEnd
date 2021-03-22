import React, { Component } from "react";
import "./profileHeader.css";

import ProfileInfoBar from "./ProfileInfoBar";

/** Returns the header of the profile with all the info
 * @param name
 * @param info
 * @param description
 * @param city, province
 * @param buttonText
 * @param handleSubmit function to fire if clicked button. If none, set button to disabled
 */
export class ProfileHeader extends Component {
  render() {
    const buttonClassSuffix = this.props.handleSubmit ? "" : "button-disabled";

    return (
      <div id="profile-header">
        <p id="profile-name">{this.props.name}</p>
        {this.props.info ? <ProfileInfoBar info={this.props.info} /> : null}
        <div>
          <p id="profile-place">
            {this.props.city}, {this.props.province}
          </p>
          <p id="profile-description">{this.props.description}</p>
        </div>
        <p
          id="profile-button"
          className={"button " + buttonClassSuffix}
          onClick={this.props.handleSubmit}
          style={this.props.style}
        >
          {this.props.buttonText.toUpperCase()}
        </p>
      </div>
    );
  }
}

export default ProfileHeader;
