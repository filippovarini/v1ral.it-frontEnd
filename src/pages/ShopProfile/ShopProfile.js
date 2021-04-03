/* 
1. get username as route param 
2. get shop associated with it from db
3. output info
*/
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import errorHandler from "../../functions/errorHandler";
import "./shopProfile.css";

import it from "../../locales/it.json";

import Header from "../../components/Header/Header";
import Navigator from "../../components/Navigator/Navigator";
import Loading from "../../components/Loading/Loading";
import InsertChallenger from "../../components/InsertChallenger/Challenger";
import ShopStats from "../../components/ShopStats/ShopStats";
import ServiceExplanaiton from "../../components/ShopServiceExplanaiton/ShopServiceExplanaiton";
import ProfileHeader from "../../components/ProfileHeaders/ShopProfileHeader";
import ShopBackground from "../../components/ShopBackgroundImage/ShopBackground";

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
    fetch("/transaction/cart", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ item: this.state.shop.id })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (!jsonRes.success) {
          if (jsonRes.insertChallenger) this.toggleChallenger();
          else if (jsonRes.cartDuplicate) alert(jsonRes.message);
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
    let profileHeaderButtonText = it.shop_button_add_to_cart;
    let profileHeaderButtonClickHandler = this.handleSubmit;
    if (this.state.added || this.state.alreadyBought) {
      profileHeaderButtonClickHandler = null;
      profileHeaderButtonStyle = { background: "green" };
      profileHeaderButtonText = this.state.added
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
    if (this.state.shop) {
      bodyComponent =
        this.state.navState === 0 ? (
          <ShopStats
            disruptionIndex={this.getDisruptionIndex()}
            priceIncrement={Math.ceil(
              (parseFloat(this.state.shop.currentprice) * 100) /
                this.state.shop.initialprice -
                100
            )}
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
            {/* <ShopImages
            logourl={this.state.shop.logourl}
            backgroundurl={this.state.shop.backgroundurl}
          /> */}
            <ShopBackground url={this.state.shop.backgroundurl} />
            <ProfileHeader
              profile={{
                name: this.state.shop.name,
                description: this.state.shop.bio,
                city: this.state.shop.city,
                province: this.state.shop.province,
                currentprice: this.state.shop.currentprice,
                logourl: this.state.shop.logourl
              }}
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
    return (
      <div>
        <Header />
        <div className="page-wrapper">
          {this.state.loading ? <Loading class="page-loading" /> : body}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(withRouter(ShopProfile));
