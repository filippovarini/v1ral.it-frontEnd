import React, { Component } from "react";
import { connect } from "react-redux";

import CartController from "../../functions/CartController";

import it from "../../locales/it.json";

import InsertChallenger from "../../components/InsertChallenger/Challenger";
import ShopHead from "./components/ShopHead";
import ShopBody from "./components/ShopBody";
import Navigator from "../../components/Navigator/Navigator";
import ShopInfoWrapper from "./components/ShopInfo/InfoWrapper";

/** Renders shop profile
 * @param toggleLoading
 * @param setLoading
 * @param setAdded set shop as added
 * @param loading
 * @param shop
 * @param services
 * @param goals
 * @param added
 * @param alreadyBought
 * @param getBarChartWidth function to get current shop body width
 * @param passesLeft
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

    return (
      <div>
        <div id="shop-profile" className="flex-line">
          <div id="shop-profile-body">
            <ShopHead
              profileHeaderButtonClickHandler={profileHeaderButtonClickHandler}
              profileHeaderButtonStyle={profileHeaderButtonStyle}
              profileHeaderButtonText={profileHeaderButtonText}
              backgroundUrl={this.props.shop.background}
              totalPriviledges={this.props.services.length}
              totalPassesSold={this.props.shop.total_premiums}
              totalPassesToVirals={this.props.shop.viral_premiums}
              passesLeft={this.props.passesLeft}
              shopProfile={{
                name: this.props.shop.name,
                description: this.props.shop.bio,
                city: this.props.shop.city,
                province: this.props.shop.province,
                currentPrice: this.props.shop.currentPrice,
                logo: this.props.shop.logo
              }}
              passMonthDuration={this.props.shop.pass_month_duration}
              priceIncrement={Math.ceil(
                (parseFloat(this.props.shop.currentPrice) * 100) /
                  this.props.shop.initialPrice -
                  100
              )}
              goalsDone={-1}
            />
            <div id="shop-nav">
              <Navigator
                active={this.state.navState}
                updateNav={this.updateNav}
                titles={["Dove vanno i soldi?", it.stats]}
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
        <InsertChallenger
          hidden={this.state.insertChallengerHidden}
          hide={this.toggleChallenger}
          alreadyAccountRedirection={
            "/login/?onSuccess=" + window.location.pathname
          }
          successRedirection={window.location.pathname}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(ShopProfile);
