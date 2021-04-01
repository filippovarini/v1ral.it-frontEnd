import React, { Component } from "react";

import Settings from "../Settings/Settings";
import ProfileInfoBar from "./ProfileInfoBar";

/** Renders shop profile header
 * @param profile: {name, city, province, description}
 * @param info list of three info to show on the instagram-like header
 * @param dashboard?
 * @param handleSubmit?
 * @param style
 * @param buttonText
 * @param handleDashboardClick
 */
export class ShopProfileHeader extends Component {
  state = { settingsHidden: true };

  toggleSettings = () => {
    console.log("toggling");
    this.setState({ settingsHidden: !this.state.settingsHidden });
  };

  render() {
    const buttonClassSuffix = this.props.handleSubmit ? "" : "disabled";

    const settingsButton = this.props.dashboard ? (
      <div className="profile-header-settings">
        <i
          className="fas fa-cog settings-button"
          onClick={this.toggleSettings}
        ></i>
        <Settings
          hidden={this.state.settingsHidden}
          hide={this.toggleSettings}
          handleDashboardClick={this.props.handleDashboardClick}
        />
      </div>
    ) : null;

    return (
      <div className="profile-header">
        {settingsButton}
        <p className="profile-name">{this.props.profile.name}</p>
        <ProfileInfoBar info={this.props.info} />
        <div>
          <p className="profile-place">
            {this.props.profile.city}, {this.props.profile.province}
          </p>
          <p className="profile-description">
            {this.props.profile.description}
          </p>
        </div>
        <p
          className={"button profile-button " + buttonClassSuffix}
          onClick={this.props.handleSubmit}
          style={this.props.style}
        >
          {this.props.buttonText.toUpperCase()}
        </p>
      </div>
    );
  }
}

export default ShopProfileHeader;
