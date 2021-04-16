import React, { Component } from "react";

import it from "../../locales/it.json";

import ShopBackground from "../../components/ShopBackgroundImage/ShopBackground";
import ProfileHeader from "../../components/ProfileHeaders/ShopProfileHeader";
import ShopStatsBar from "../../components/ShopStatsBar/ShopStats";

/** Returns the top box of shop profile (images and profile header)
 * @param profileHeaderButtonStyle
 * @param profileHeaderButtonText
 * @param profileHeaderButtonClickHandler function to fire on button click
 * @param backgroundUrl shop background image
 * @param shopProfile {name, description, city, province, currentprice, logourl}
 * @param totalPriviledges
 * @param totalPassesSold
 * @param totalPassesToVirals
 * @param passesLeft
 * @param passMonthDuration
 * @param priceIncrement
 * @param goalsDone
 */
export class ShopHead extends Component {
  render() {
    return (
      <div>
        <div id="shopProfile-header-container">
          <ShopBackground url={this.props.backgroundUrl} />
          <ProfileHeader
            profile={this.props.shopProfile}
            info={[
              {
                title: it.shop_priviledges_offered,
                data: this.props.totalPriviledges
              },
              {
                title: it.shop_donations_received,
                data: this.props.totalPassesSold
              },
              {
                title: it.shop_viral_donation_received,
                data: this.props.totalPassesToVirals
              }
            ]}
            handleSubmit={this.props.profileHeaderButtonClickHandler}
            buttonText={this.props.profileHeaderButtonText}
            style={this.props.profileHeaderButtonStyle}
            passesLeft={this.props.passesLeft > 0}
          />
        </div>
        <ShopStatsBar
          pass_month_duration={this.props.passMonthDuration}
          priceIncrement={this.props.priceIncrement}
          placesLeft={this.props.passesLeft}
          goalsDone={this.props.goalsDone}
        />
      </div>
    );
  }
}

export default ShopHead;
