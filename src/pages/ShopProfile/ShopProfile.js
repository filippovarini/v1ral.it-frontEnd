/* 
1. get username as route param 
2. get shop associated with it from db
3. output info
*/
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./shopProfile.css";

import Header from "../../components/Header/Header";
import ShopProfileHeader from "./components/ProfileHeader/ShopProfileHeader";
import Navigator from "../../components/Navigator/Navigator";
import ServiceBoxes from "../../components/ServiceBoxes/ServiceBoxes";
import Info from "./components/Info/Info";
import Loading from "../../components/Loading/Loading";
import InsertChallenger from "../../components/InsertChallenger/Challenger";

// faq data
import services from "../../faqData/services";

import errorHandler from "../Error/ErrorHandler";

export class ShopProfile extends Component {
  state = {
    loading: true,
    navState: 0,
    shop: null,
    added: false,
    insertChallengerHidden: true
  };

  toggleChallenger = () => {
    this.setState({
      insertChallengerHidden: !this.state.insertChallengerHidden
    });
  };

  /** Get info from database and session */
  componentDidMount = () => {
    const id = this.props.history.location.pathname.split("/").slice(-1)[0];
    fetch(`/page/shopProfile/${id}`)
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success)
          this.setState({ shop: jsonRes.shop, added: jsonRes.added });
        else errorHandler(jsonRes);
        this.setState({ loading: false });
      })
      .catch(e => {
        console.log(e);
        this.props.history.push("/error");
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
        this.props.history.push("/error");
      });
  };

  updateNav = i => this.setState({ navState: i });

  render() {
    let bodyComponent =
      this.state.navState === 0 ? (
        <ServiceBoxes
          boxes={[
            { type: "premium", services },
            { type: "viral", services }
          ]}
        />
      ) : (
        <Info />
      );

    const body = this.state.shop ? (
      <div className="page-wrapper">
        <div id="shopProfile-header-container">
          <InsertChallenger
            hidden={this.state.insertChallengerHidden}
            hide={this.toggleChallenger}
            alreadyAccountRedirection="/login"
            successRedirection={this.props.history.location.pathname}
          />
          <div id="shopProfile-logo" className="box">
            <img
              src="http://www.ciroamergellina.it/wp-content/themes/yootheme/cache/Logo-Ciro-a-Mergellina-detto-o-nas-e-cane-9075f8fa.png"
              alt="logo dell'impresa"
            />
          </div>
          <ShopProfileHeader
            name={this.state.shop.name}
            goalsDone={-1}
            totalCases={this.state.shop.premiums}
            dailyCases={-1}
            description={this.state.shop.bio}
            goalsDonePercentage={this.state.shop.goalsdone}
            handleSubmit={this.handleSubmit}
            added={this.state.added}
          />
        </div>
        <div id="shopProfile-nav">
          <Navigator
            active={this.state.navState}
            updateNav={this.updateNav}
            titles={["Servizi Premium", "Info Focolaio"]}
          />
        </div>
        {bodyComponent}
      </div>
    ) : null;
    return (
      <div>
        <Header titles={[{ name: "carrello" }, { name: "profilo" }]} />
        <div className="page-wrapper">
          {this.state.loading ? <Loading /> : body}
        </div>
      </div>
    );
  }
}

export default withRouter(ShopProfile);
