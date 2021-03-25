/* 
1. get username as route param 
2. get shop associated with it from db
3. output info
*/
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import errorHandler from "../../functions/errorHandler";
import "./shopProfile.css";

import Header from "../../components/Header/Header";
import ShopProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Navigator from "../../components/Navigator/Navigator";
import Loading from "../../components/Loading/Loading";
import InsertChallenger from "../../components/InsertChallenger/Challenger";
import ShopImages from "../../components/ShopImages/ShopImages";
import ShopStats from "../../components/ShopStats/ShopStats";
import ServiceExplanaiton from "../../components/ShopServiceExplanaiton/ShopServiceExplanaiton";

export class ShopProfile extends Component {
  state = {
    loading: true,
    navState: 0,
    shop: null,
    cases: null,
    added: false,
    alreadyBought: false,
    insertChallengerHidden: true
  };

  toggleChallenger = () => {
    this.setState({
      insertChallengerHidden: !this.state.insertChallengerHidden
    });
  };

  /** Get info from database and session */
  componentDidMount = () => {
    const id = this.props.match.params.id;
    fetch(`/page/shopProfile/${id}`)
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          this.setState({
            shop: jsonRes.shop,
            added: jsonRes.added,
            alreadyBought: jsonRes.alreadyBought,
            services: jsonRes.services,
            goals: jsonRes.goals,
            cases: jsonRes.cases,
            loading: false
          });
        } else if (jsonRes.invalidShopId) {
          alert(jsonRes.message);
          window.location = "/shops";
        } else {
          errorHandler.serverError(jsonRes);
          this.setState({ loading: false });
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  /** Adds shop to the cart
   * If not validated, lets the user insert the challenger or login
   */
  handleSubmit = () => {
    this.setState({ loading: true });
    fetch("/shop/updateCart", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ shopId: this.state.shop.id })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (!jsonRes.success) {
          if (jsonRes.insertChallenger) this.toggleChallenger();
          else this.props.history.push("/login");
        } else this.setState({ added: true });
        this.setState({ loading: false });
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
    /** Dynamic button props based on whether the user is logged,
     * as bought or added the shop to the cart */
    let profileHeaderButtonStyle = null;
    let profileHeaderButtonText = "contagiati qui";
    let profileHeaderButtonClickHandler = this.handleSubmit;
    if (this.state.added || this.state.alreadyBought) {
      profileHeaderButtonClickHandler = null;
      profileHeaderButtonStyle = { background: "green" };
      profileHeaderButtonText = this.state.added
        ? "contagiandoti..."
        : "già contagiato";
    }

    let bodyComponent = null;
    if (this.state.shop) {
      bodyComponent =
        this.state.navState === 0 ? (
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
        ) : (
          <ServiceExplanaiton
            goals={this.state.goals}
            services={this.state.services}
          />
        );
    }

    const body = this.state.shop ? (
      <div className="page-wrapper">
        <div id="shopProfile-header-container">
          <InsertChallenger
            hidden={this.state.insertChallengerHidden}
            hide={this.toggleChallenger}
            alreadyAccountRedirection={
              "/login/?onSuccess=" + window.location.pathname
            }
            successRedirection={this.props.history.location.pathname}
          />
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
          />
        </div>
        <div id="shopProfile-nav">
          <Navigator
            active={this.state.navState}
            updateNav={this.updateNav}
            titles={["Statistiche epidemiologiche", "Dove vanno i soldi?"]}
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

export default withRouter(ShopProfile);
