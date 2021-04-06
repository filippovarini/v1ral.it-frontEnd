import React, { Component } from "react";
import "./profileHeaders.css";

import it from "../../locales/it.json";

import ProfileInfoBar from "./ProfileInfoBar";
import Settings from "../Settings/Settings";
import ViralTick from "../ViralUserTick/ViralUserTick";

/** Renders user profile header
 * @param profile: {name, city, province, description}
 * @param info list of three info to show on the instagram-like header
 * @param dashbaord?
 */
export class UserProfileHeader extends Component {
  state = { settingsHidden: true };

  toggleSettings = () => {
    this.setState({ settingsHidden: !this.state.settingsHidden });
  };

  render() {
    const settingsButton = this.props.dashboard ? (
      <div className="profile-header-settings">
        <i
          className="fas fa-cog settings-button"
          onClick={this.toggleSettings}
        ></i>
        <Settings
          hidden={this.state.settingsHidden}
          hide={this.toggleSettings}
          isUser={true}
        />
      </div>
    ) : null;
    return (
      <div id="user-profile-header" className="profile-header">
        {settingsButton}
        <div className="flex-line" style={{ alignItems: "flex-start" }}>
          <p className="profile-name">{this.props.profile.name}</p>
          {this.props.profile.type === "viral" ? (
            <ViralTick class="big" />
          ) : null}
        </div>

        <ProfileInfoBar info={this.props.info} />
        <div>
          <p className="profile-place">
            {this.props.profile.city}, {this.props.profile.province}
          </p>
          <p className="profile-description">
            {this.props.profile.description}
          </p>
        </div>
        {this.props.profile.type === "viral" ? (
          <p
            className="profile-button button disabled"
            style={this.props.style}
          >
            {it.viral_profile_disabledButton}
          </p>
        ) : (
          <p
            id="number-to-viral-button"
            className="profile-button button disabled"
          >
            {`${this.props.numberToViral} ${it.standard_profile_disabledButton}`}
          </p>
        )}
      </div>
    );
  }
}

export default UserProfileHeader;
