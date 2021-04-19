import React, { Component } from "react";
import { connect } from "react-redux";
import cartController from "../../../functions/CartController";

import it from "../../../locales/it.json";

import ShopBackground from "../../../components/ShopBackgroundImage/ShopBackground";
import ProfileHeader from "../../../components/ProfileHeaders/ShopProfileHeader";
import ShopStatsBar from "../../../components/ShopStatsBar/ShopStats";
import InsertChallenger from "../../../components/InsertChallenger/Challenger";

/** Returns the top box of shop profile (images and profile header)
 * @param shop
 * @param passesLeft
 * @param services
 * @param passesLeft
 * @param goalsDone
 * @param dashboard
 * @param added?
 * @param alreadyBought?
 */
export class ShopHead extends Component {
  state = {
    buttonLoading: false,
    insertChallengerHidden: true
  };

  /** Toggles pop up with which the user can insert the user that challenged
   * him
   */
  toggleChallenger = () => {
    this.setState({
      insertChallengerHidden: !this.state.insertChallengerHidden
    });
  };

  /** Adds shop to the cart. (Only used when displaying shop profile, not dashboard)
   * If not validated, lets the user insert the challenger or login
   */
  handleSubmit = async () => {
    this.setState({ buttonLoading: true });
    const jsonRes = await cartController.post(this.props.shop.id, "pass");
    if (!jsonRes.success) {
      if (jsonRes.insertChallenger) this.toggleChallenger();
      else if (jsonRes.cartDuplicate) alert(jsonRes.message);
      else window.location = "/login";
    } else this.props.setAdded();
    this.setState({ buttonLoading: false });
  };

  /** Gets the style, text and handleClick of the profile header button, based
   * on the type of page (dashbaord or profile) and whether the user has bought
   * already that shop (or added to cart)
   */
  getProfileButton = () => {
    /** Dynamic button props based on whether we are showing the dashboard or if
     * profile, whether the user as bought or added the shop to the cart */
    let style = null;
    let text = it.shop_button_add_to_cart;
    let handleClick = this.handleSubmit;
    if (this.props.added || this.props.alreadyBought) {
      handleClick = null;
      style = { background: "green" };
      text = this.props.added
        ? it.shop_button_already_added_cart
        : it.shop_button_already_bought;
    }

    if (this.props.user.name && this.props.user.name[0] === "#") {
      // a shop is logged
      text = "per selezionare, esci dall'account focolaio";
      handleClick = null;
      style = { fontSize: ".8rem" };
    }

    if (this.state.buttonLoading) {
      handleClick = null;
      text = "loading...";
      style = { background: "var(--gray)" };
    }

    if (this.props.dashboard) {
      style = null;
      text = it.shop_buy_our_marketing_products;
      handleClick = () => this.props.history.push("/spread");
    }

    return {
      text,
      style,
      handleClick
    };
  };

  render() {
    return (
      <div>
        <div id="shopProfile-header-container">
          <ShopBackground url={this.props.shop.backgroundurl} />
          <ProfileHeader
            profile={{
              name: this.props.shop.name,
              description: this.props.shop.bio,
              city: this.props.shop.city,
              province: this.props.shop.province,
              currentprice: this.props.shop.currentprice,
              logourl: this.props.shop.logourl || ""
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
            button={this.getProfileButton()}
            passesLeft={this.props.passesLeft > 0}
            dashboard={this.props.dashboard}
          />
        </div>
        <ShopStatsBar
          pass_month_duration={this.props.shop.pass_month_duration}
          priceIncrement={Math.ceil(
            (parseFloat(this.props.shop.currentprice) * 100) /
              this.props.shop.initialprice -
              100
          )}
          placesLeft={this.props.passesLeft}
          goalsDone={this.props.goalsDone}
        />
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

export default connect(mapStateToProps)(ShopHead);
