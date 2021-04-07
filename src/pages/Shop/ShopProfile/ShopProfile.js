/* 
1. get username as route param 
2. get shop associated with it from db
3. output info
*/
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import errorHandler from "../../../functions/errorHandler";
import "./shopProfile.css";

import it from "../../../locales/it.json";

import Navigator from "../../../components/Navigator/Navigator";
import InsertChallenger from "../../../components/InsertChallenger/Challenger";
import ShopStats from "../../../components/ShopStats/ShopStats";
import ServiceExplanaiton from "../../../components/ShopServiceExplanaiton/ShopServiceExplanaiton";
import ProfileHeader from "../../../components/ProfileHeaders/ShopProfileHeader";
import ShopBackground from "../../../components/ShopBackgroundImage/ShopBackground";

/**
 * @param toggleLoading
 * @param setAdded set shop as added
 * @param loading
 * @param shop
 * @param services
 * @param goals
 * @param added
 * @param alreadyBought
 */
export class ShopProfile extends Component {
  state = {
    navState: 0,
    insertChallengerHidden: true
  };

  toggleChallenger = () => {
    this.setState({
      insertChallengerHidden: !this.state.insertChallengerHidden
    });
  };

  /** Adds shop to the cart
   * If not validated, lets the user insert the challenger or login
   */
  handleSubmit = () => {
    this.props.toggleLoading();
    fetch("/transaction/cart", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ item: this.props.shop.id })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (!jsonRes.success) {
          if (jsonRes.insertChallenger) this.toggleChallenger();
          else if (jsonRes.cartDuplicate) alert(jsonRes.message);
          else this.props.history.push("/login");
        } else this.props.setAdded();
        this.props.toggleLoading();
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
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

  render() {
    /** Dynamic button props based on whether the user is logged,
     * as bought or added the shop to the cart */
    let profileHeaderButtonStyle = null;
    let profileHeaderButtonText = it.shop_button_add_to_cart;
    let profileHeaderButtonClickHandler = this.handleSubmit;
    if (this.props.added || this.props.alreadyBought) {
      profileHeaderButtonClickHandler = null;
      profileHeaderButtonStyle = { background: "green" };
      profileHeaderButtonText = this.props.added
        ? it.shop_button_already_added_cart
        : it.shop_button_already_bought;
    }

    if (this.props.user.name && this.props.user.name[0] === "#") {
      // a shop is logged
      profileHeaderButtonText = "per selezionare, esci dall'account focolaio";
      profileHeaderButtonClickHandler = null;
      profileHeaderButtonStyle = { fontSize: ".8rem" };
    }

    let bodyComponent = null;
    if (this.props.shop) {
      bodyComponent =
        this.state.navState === 0 ? (
          <ShopStats
            disruptionIndex={this.getDisruptionIndex()}
            priceIncrement={Math.ceil(
              (parseFloat(this.props.shop.currentprice) * 100) /
                this.props.shop.initialprice -
                100
            )}
            placesLeft={
              this.props.shop.maxpremiums - this.props.shop.total_premiums
            }
            goalsDone={(
              parseFloat(this.props.shop.financed_so_far) /
              this.getDisruptionIndex()
            ).toFixed(2)}
            cases={this.props.cases || {}}
          />
        ) : (
          <ServiceExplanaiton
            goals={this.props.goals}
            services={this.props.services}
          />
        );
    }

    const body = this.props.shop ? (
      <div className="page-wrapper">
        <div className="shop-profile">
          <div id="shopProfile-header-container">
            <InsertChallenger
              hidden={this.state.insertChallengerHidden}
              hide={this.toggleChallenger}
              alreadyAccountRedirection={
                "/login/?onSuccess=" + window.location.pathname
              }
              successRedirection={this.props.history.location.pathname}
            />
            <ShopBackground url={this.props.shop.backgroundurl} />
            <ProfileHeader
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
      </div>
    ) : null;

    return body;
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(withRouter(ShopProfile));
