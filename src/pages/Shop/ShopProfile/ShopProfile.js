/* 
1. get username as route param 
2. get shop associated with it from db
3. output info
*/
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CartController from "../../../functions/CartController";
import goalsDone from "../../../functions/goalsDone";
import "./shopProfile.css";

import it from "../../../locales/it.json";

import Navigator from "../../../components/Navigator/Navigator";
import InsertChallenger from "../../../components/InsertChallenger/Challenger";
import ServiceExplanaiton from "../../../components/ShopServiceExplanaiton/ShopServiceExplanaiton";
import ProfileHeader from "../../../components/ProfileHeaders/ShopProfileHeader";
import ShopBackground from "../../../components/ShopBackgroundImage/ShopBackground";
import ShopStats from "../../../components/ShopStatsBar/ShopStats";
import BarChart from "../../../components/BarChart/BarChart";
import ShopInfoWrapper from "../ShopInfo/InfoWrapper";

/**
 * @param toggleLoading
 * @param setLoading
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
    insertChallengerHidden: true,
    buttonLoading: false
  };

  toggleChallenger = () => {
    this.setState({
      insertChallengerHidden: !this.state.insertChallengerHidden,
      shit: "la"
    });
  };

  /** Adds shop to the cart
   * If not validated, lets the user insert the challenger or login
   */
  handleSubmit = async () => {
    this.setState({ buttonLoading: true });
    const jsonRes = await CartController.post(this.props.shop.id, "pass");
    if (!jsonRes.success) {
      if (jsonRes.insertChallenger) this.toggleChallenger();
      else if (jsonRes.cartDuplicate) alert(jsonRes.message);
      else this.props.history.push("/login");
    } else this.props.setAdded();
    this.setState({ buttonLoading: false });
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

    if (this.state.buttonLoading) {
      profileHeaderButtonClickHandler = null;
      profileHeaderButtonText = "loading...";
      profileHeaderButtonStyle = { background: "var(--gray)" };
    }

    const passesLeft =
      this.props.shop.maxpremiums - this.props.shop.total_premiums;

    let bodyComponent = null;
    if (this.props.shop) {
      bodyComponent =
        this.state.navState === 0 ? (
          <ServiceExplanaiton
            goals={this.props.goals}
            services={this.props.services}
          />
        ) : (
          <div id="shop-barChart">
            <BarChart
              cases={this.props.cases || {}}
              width={this.props.getBarChartWidth()}
            />
          </div>
        );
    }

    const body = this.props.shop ? (
      <div className="page-wrapper">
        <div id="shop-profile" className="flex-line">
          <div id="shop-profile-body">
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
                passesLeft={passesLeft > 0}
              />
            </div>
            <ShopStats
              pass_month_duration={this.props.shop.pass_month_duration}
              priceIncrement={Math.ceil(
                (parseFloat(this.props.shop.currentprice) * 100) /
                  this.props.shop.initialprice -
                  100
              )}
              placesLeft={passesLeft}
              goalsDone={goalsDone(
                this.props.shop.financed_so_far,
                this.getDisruptionIndex()
              )}
            />
            <div id="shop-nav">
              <Navigator
                active={this.state.navState}
                updateNav={this.updateNav}
                titles={["Dove vanno i soldi?", it.stats]}
              />
            </div>
            {bodyComponent}
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
            images={[
              "https://i.picsum.photos/id/229/200/300.jpg?hmac=WD1_MXzGKrVpaJj2Utxv7FoijRJ6h4S4zrBj7wmsx1U",
              "https://i.picsum.photos/id/599/200/300.jpg?hmac=E2gUK85wncj5qALDLpEjQzqgfazui9pDGMgzVWMpqo4",
              "https://i.picsum.photos/id/864/200/300.jpg?hmac=pHxnt4rXpNHIqBRpVSe-yL_pDtdwDfasgfub8GwI5mw",
              "https://i.picsum.photos/id/939/200/300.jpg?hmac=cj4OIUh8I6eW-hwT25m1_dCA6ZsAmSYixKCgsbZZmXk"
            ]}
          />
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
