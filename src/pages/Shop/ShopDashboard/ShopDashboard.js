import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./shopDashboard.css";
import goToDashboard from "../../../functions/goToDashboard";
import getGoalsDone from "../../../functions/goalsDone";

// language
import it from "../../../locales/it.json";

import ShopProfileHeader from "../../../components/ProfileHeaders/ShopProfileHeader";
import Navigator from "../../../components/Navigator/Navigator";
import ShopStats from "../../../components/ShopStatsBar/ShopStats";
import ServiceExplanaiton from "../../../components/ShopServiceExplanaiton/ShopServiceExplanaiton";
import DashboardStats from "./DashboardStats";
import ValidateStripeAccount from "../../../components/ValidateStripeAccount/ValidateStripeAccount";
import ShopBackground from "../../../components/ShopBackgroundImage/ShopBackground";
import BarChart from "../../../components/BarChart/BarChart";

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

  getGoalsDone = () => {
    const totalGoals = this.props.goals.reduce(
      (acc, goal) => acc + goal.amount,
      0
    );
    return (parseFloat(this.props.shop.financed_so_far) / totalGoals).toFixed(
      2
    );
  };

  goToDashboard = () => {
    this.props.toggleLoading();
    goToDashboard(
      window.location.pathname.slice(1),
      this.props.shop.connectedid
    );
  };

  render() {
    let bodyComponent = null;
    if (this.props.shop) {
      switch (this.state.navState) {
        case 0:
          bodyComponent = (
            <DashboardStats
              clicks={this.props.shop.clicks}
              totalSpent={this.props.totalSpent}
              totalEarned={this.props.shop.financed_so_far}
              email={this.props.shop.email}
              postcode={this.props.shop.postcode}
              street={this.props.shop.street}
            />
          );
          break;
        case 1:
          bodyComponent = (
            <div id="shop-barChart">
              <BarChart
                cases={this.props.cases || {}}
                width={this.props.getBarChartWidth()}
              />
            </div>
          );
          break;
        case 2:
          bodyComponent = (
            <ServiceExplanaiton
              goals={this.props.goals}
              services={this.props.services}
            />
          );
          break;
        default:
          alert("Invalid navState");
      }
    }

    const body = this.props.shop ? (
      <div className="page-wrapper">
        <div id="shop-profile">
          {this.props.chargesEnabled ? null : (
            <ValidateStripeAccount
              toggleLoading={this.props.toggleLoading}
              redirectPath="shop/dashboard"
              connectedId={this.props.shop.connectedid}
            />
          )}

          <div id="shopProfile-header-container">
            <ShopBackground url={this.props.shop.backgroundurl} />
            <ShopProfileHeader
              dashboard={true}
              profile={{
                name: this.props.shop.name,
                description: this.props.shop.bio,
                city: this.props.shop.city,
                province: this.props.shop.province,
                currentprice: this.props.shop.currentprice,
                logourl: this.props.shop.logourl
              }}
              info={[
                {
                  title: it.shop_priviledges_offered,
                  data: this.props.services.length
                },
                {
                  title: it.shop_donations_received,
                  data: this.props.shop.total_premiums
                },
                {
                  title: it.shop_viral_donation_received,
                  data: this.props.shop.viral_premiums
                }
              ]}
              handleSubmit={() => this.props.history.push("/spread")}
              buttonText={it.shop_buy_our_marketing_products}
              handleDashboardClick={this.goToDashboard}
              passesLeft={
                this.props.shop.maxpremiums - this.props.shop.total_premiums
              }
            />
          </div>
          <ShopStats
            pass_month_duration={this.props.shop.pass_month_duration}
            priceIncrement={(
              (parseFloat(this.props.shop.currentprice) * 100) /
                this.props.shop.initialprice -
              100
            ).toFixed(2)}
            placesLeft={
              this.props.shop.maxpremiums - this.props.shop.total_premiums
            }
            goalsDone={getGoalsDone(
              this.props.shop.financed_so_far,
              this.getDisruptionIndex()
            )}
            cases={this.props.cases || {}}
          />
          <div id="shop-nav">
            <Navigator
              active={this.state.navState}
              updateNav={this.updateNav}
              titles={[
                it.shop_dashboard_stats,
                it.stats,
                it.shop_profile_priviledges_goals
              ]}
            />
          </div>
          {bodyComponent}
        </div>
      </div>
    ) : null;
    return body;
  }
}

export default withRouter(ShopDashboard);
