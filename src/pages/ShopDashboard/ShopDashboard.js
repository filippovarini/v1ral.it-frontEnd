import React, { Component } from "react";
import errorHandler from "../../functions/errorHandler";

import Header from "../../components/Header/Header";
import ShopProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Navigator from "../../components/Navigator/Navigator";
import Loading from "../../components/Loading/Loading";
import ShopImages from "../../components/ShopImages/ShopImages";
import ShopStats from "../../components/ShopStats/ShopStats";
import ServiceExplanaiton from "../../components/ShopServiceExplanaiton/ShopServiceExplanaiton";
import DashboardStats from "./DashboardStats";

export class ShopDashboard extends Component {
  state = {
    shop: null,
    goals: null,
    cases: null,
    services: null,
    loading: true,
    navState: 0
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
            cases: jsonRes.cases
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

  render() {
    // button of header component
    let profileHeaderButtonStyle = { background: "green" };
    let profileHeaderButtonText = "diffondi il contagio";
    let profileHeaderButtonClickHandler = () => alert("spread the virus");

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
        <div id="shopProfile-header-container">
          <ShopImages
            logourl={this.state.shop.logourl}
            backgroundurl={this.state.shop.backgroundurl}
          />
          <ShopProfileHeader
            dashboard={this.props.dashboard}
            name={this.state.shop.name}
            info={[
              { title: "privilegi offerti", data: this.state.services.length },
              { title: "contagi", data: this.state.shop.total_premiums },
              { title: "di cui virali", data: this.state.shop.viral_premiums }
            ]}
            description={this.state.shop.bio}
            city={this.state.shop.city}
            province={this.state.shop.province}
            handleSubmit={profileHeaderButtonClickHandler}
            buttonText={profileHeaderButtonText}
            style={profileHeaderButtonStyle}
            dashboard={true}
            shopProfile={true}
          />
        </div>
        <div id="shopProfile-nav" style={{ minWidth: "450px" }}>
          <Navigator
            active={this.state.navState}
            updateNav={this.updateNav}
            titles={[
              "Dati e transati",
              "Statistiche epidemiologiche",
              "Dove vanno i soldi?"
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
