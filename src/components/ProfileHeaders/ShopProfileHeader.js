import React, { Component } from "react";

import it from "../../locales/it.json";

import Settings from "../Settings/Settings";
import ProfileInfoBar from "./ProfileInfoBar";

/** Renders shop profile header
 * @param passesLeft boolean, represents whether all passes have been sold
 * @param profile: {name, city, province, description, currentprice, logourl}
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

    let button = (
      <p
        className={"button profile-button " + buttonClassSuffix}
        onClick={this.props.handleSubmit}
        style={this.props.style}
      >
        {this.props.buttonText}
      </p>
    );

    if (!this.props.passesLeft) {
      button = (
        <p className="profile-button button warning disabled">
          {it.no_passese_left}
        </p>
      );
    }

    return (
      <div className="profile-header">
        {settingsButton}
        <div className="profile-name flex-line">
          <img
            src={this.props.profile.logourl}
            alt="logo dell'impresa"
            id="profile-shop-logo"
          />
          <p>{this.props.profile.name}</p>
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
        <div id="shop-price" className="flex-line">
          <p id="shop-price-header">{it.shop_profile_currentprice}:</p>
          <p id="shop-price-value">{this.props.profile.currentprice} €</p>
        </div>
        {button}
      </div>
    );
  }
}

export default ShopProfileHeader;
