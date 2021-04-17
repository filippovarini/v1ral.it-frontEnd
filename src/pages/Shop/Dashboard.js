import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import goToDashboard from "../../functions/goToDashboard";
import getGoalsDone from "../../functions/goalsDone";

// language
import it from "../../locales/it.json";

import ShopHead from "./components/ShopHead";
import ShopInfoWrapper from "./components/ShopInfo/InfoWrapper";
import Navigator from "../../components/Navigator/Navigator";
import ShopBody from "./components/ShopBody";
import ValidateStripeAccount from "../../components/ValidateStripeAccount/ValidateStripeAccount";

/**
 * @param shop
 * @param goals
 * @param services
 * @param cases
 * @param loading
 * @param totalSpent
 * @param chargesEnabled
 * @param toggleLoading
 *
 */
export class ShopDashboard extends Component {
  state = {
    navState: 0
  };

  updateNav = i => this.setState({ navState: i });

  getDisruptionIndex = () => {
    return this.props.goals
      ? this.props.goals.reduce((acc, goal) => acc + goal.amount, 0)
      : 0;
  };

  /** Redirect shop user to stripe payments dashboard */
  goToDashboard = () => {
    this.props.toggleLoading();
    goToDashboard(
      window.location.pathname.slice(1),
      this.props.shop.connectedid
    );
  };

  render() {
    return (
      <div>
        <div id="shop-profile" className="flex-line">
          <div id="shop-profile-body">
            {this.props.chargesEnabled ? null : (
              <ValidateStripeAccount
                toggleLoading={this.props.toggleLoading}
                redirectPath="shop/dashboard"
                connectedId={this.props.shop.connectedid}
              />
            )}
            <ShopHead
              dashboard={true}
              profileHeaderButtonText={it.shop_buy_our_marketing_products}
              profileHeaderButtonClickHandler={() =>
                this.props.history.push("/spread")
              }
              profileHeaderButtonStyle={null}
              backgroundUrl={this.props.shop.backgroundurl}
              totalPriviledges={this.props.services.length}
              totalPassesSold={this.props.shop.total_premiums}
              totalPassesToVirals={this.props.shop.viral_premiums}
              passesLeft={this.props.passesLeft}
              shopProfile={{
                name: this.props.shop.name,
                description: this.props.shop.bio,
                city: this.props.shop.city,
                province: this.props.shop.province,
                currentprice: this.props.shop.currentprice,
                logourl: this.props.shop.logourl
              }}
              passMonthDuration={this.props.shop.pass_month_duration}
              priceIncrement={Math.ceil(
                (parseFloat(this.props.shop.currentprice) * 100) /
                  this.props.shop.initialprice -
                  100
              )}
              goalsDone={getGoalsDone(
                this.props.shop.financed_so_far,
                this.getDisruptionIndex()
              )}
            />
            <div id="shop-nav">
              <Navigator
                active={this.state.navState}
                updateNav={this.updateNav}
                titles={[it.stats, it.shop_profile_priviledges_goals]}
              />
            </div>
            <ShopBody
              goals={this.props.goals}
              services={this.props.services}
              cases={this.props.cases}
              getBarChartWidth={this.props.getBarChartWidth}
              navState={this.state.navState}
            />
          </div>
          <ShopInfoWrapper
            phone={3206265132}
            instagram_link="https://www.instagram.com/sant.ippo/"
            facebook_link="https://www.facebook.com/thejackalweb/"
            city={this.props.shop.city}
            province={this.props.shop.province}
            street={this.props.shop.street}
            email={this.props.shop.emial}
            category={this.props.shop.category}
            name={this.props.shop.name}
            images={this.props.images}
            zoomImage={this.props.zoomImage}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ShopDashboard);
