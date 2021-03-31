import React, { Component } from "react";
import errorHandler from "../../functions/errorHandler";
import goToDashboard from "../../functions/goToDashboard";

// language
import it from "../../locales/it.json";

import Header from "../../components/Header/Header";
import ShopProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Navigator from "../../components/Navigator/Navigator";
import Loading from "../../components/Loading/Loading";
import ShopImages from "../../components/ShopImages/ShopImages";
import ShopStats from "../../components/ShopStats/ShopStats";
import ServiceExplanaiton from "../../components/ShopServiceExplanaiton/ShopServiceExplanaiton";
import DashboardStats from "./DashboardStats";
import ValidateStripeAccount from "../../components/ValidateStripeAccount/ValidateStripeAccount";

export class ShopDashboard extends Component {
  state = {
    shop: null,
    goals: null,
    cases: null,
    services: null,
    loading: true,
    navState: 0,
    chargesEnabled: false
  };

  componentDidMount = () => {
    fetch("/page/dashboard/shop")
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          this.setState({
            loading: false,
            shop: jsonRes.shop,
            services: jsonRes.services,
            goals: jsonRes.goals,
            cases: jsonRes.cases,
            chargesEnabled: jsonRes.chargesEnabled
          });
        } else {
          if (jsonRes.serverError) errorHandler.serverError(jsonRes);
          this.props.history.push("/");
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  updateNav = i => this.setState({ navState: i });

  getDisruptionIndex = () => {
    return this.state.goals
      ? this.state.goals.reduce((acc, goal) => acc + goal.amount, 0)
      : 0;
  };

  getGoalsDone = () => {
    const totalGoals = this.state.goals.reduce(
      (acc, goal) => acc + goal.amount,
      0
    );
    return (parseFloat(this.state.shop.financed_so_far) / totalGoals).toFixed(
      2
    );
  };

  goToDashboard = () => {
    this.setState({ loading: true });
    goToDashboard("shop/dashboard", this.state.shop.connectedid);
  };

  render() {
    // button of header component
    let profileHeaderButtonStyle = { background: "green" };
    let profileHeaderButtonText = it.shop_buy_our_marketing_products;
    let profileHeaderButtonClickHandler = () =>
      this.props.history.push("/spread");

    let bodyComponent = null;
    if (this.state.shop) {
      switch (this.state.navState) {
        case 0:
          bodyComponent = (
            <DashboardStats
              clicks={this.state.shop.clicks}
              totalSpent={10}
              totalEarned={this.state.shop.financed_so_far}
              email={this.state.shop.email}
              postcode={this.state.shop.postcode}
              street={this.state.shop.street}
            />
          );
          break;
        case 1:
          bodyComponent = (
            <ShopStats
              disruptionIndex={this.getDisruptionIndex()}
              priceIncrement={(
                (parseFloat(this.state.shop.currentprice) * 100) /
                  this.state.shop.initialprice -
                100
              ).toFixed(2)}
              placesLeft={
                this.state.shop.maxpremiums - this.state.shop.total_premiums
              }
              goalsDone={(
                parseFloat(this.state.shop.financed_so_far) /
                this.getDisruptionIndex()
              ).toFixed(2)}
              cases={this.state.cases || {}}
            />
          );
          break;
        case 2:
          bodyComponent = (
            <ServiceExplanaiton
              goals={this.state.goals}
              services={this.state.services}
            />
          );
          break;
        default:
          alert("Invalid navState");
      }
    }

    const body = this.state.shop ? (
      <div className="page-wrapper">
        {this.state.chargesEnabled ? null : (
          <ValidateStripeAccount
            toggleLoading={() =>
              this.setState({ loading: !this.state.loading })
            }
            redirectPath="shop/dashboard"
            connectedId={this.state.shop.connectedid}
          />
        )}

        <div id="shopProfile-header-container">
          <ShopImages
            logourl={this.state.shop.logourl}
            backgroundurl={this.state.shop.backgroundurl}
          />
          <ShopProfileHeader
            dashboard={true}
            name={this.state.shop.name}
            info={[
              {
                title: it.shop_priviledges_offered,
                data: this.state.services.length
              },
              {
                title: it.shop_donations_received,
                data: this.state.shop.total_premiums
              },
              {
                title: it.shop_viral_donation_received,
                data: this.state.shop.viral_premiums
              }
            ]}
            description={this.state.shop.bio}
            city={this.state.shop.city}
            province={this.state.shop.province}
            handleSubmit={profileHeaderButtonClickHandler}
            buttonText={profileHeaderButtonText}
            style={profileHeaderButtonStyle}
            shopProfile={true}
            handleDashboardClick={this.goToDashboard}
          />
        </div>

        <div id="shopProfile-nav" style={{ minWidth: "450px" }}>
          <Navigator
            active={this.state.navState}
            updateNav={this.updateNav}
            titles={[
              it.shop_dashboard_stats,
              it.shop_profile_stats,
              it.shop_profile_priviledges_goals
            ]}
          />
        </div>
        {bodyComponent}
      </div>
    ) : null;
    return (
      <div>
        <Header />
        <div className="page-wrapper">
          {this.state.loading ? <Loading /> : body}
        </div>
      </div>
    );
  }
}

export default ShopDashboard;
