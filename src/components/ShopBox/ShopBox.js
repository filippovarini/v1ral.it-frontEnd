/* PROPS:
- logourl
- backgroundurl
- name
- place
- goalsCompleted
- cases
- category 
*/

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./shopBox.css";

import errorHandler from "../../functions/errorHandler";

import it from "../../locales/it.json";

import Loading from "../Loading/Loading";
import PercentageLoader from "../PercentageLoader/PercentaceLoader";
import ShopBackground from "../ShopBackgroundImage/ShopBackground";

/** Render shop box with add to cart functionalities */
export class ShopBox extends Component {
  state = {
    shopMenuHidden: true,
    loading: false
  };

  handleClick = () => {
    this.props.history.push(`/shop/${this.props.shop.id}`);
  };

  getPercentage = () => {
    return Math.min(
      Math.ceil(
        (parseFloat(this.props.shop.financed_so_far) /
          this.props.shop.disruption_index) *
          100
      ) || 0,
      100
    );
  };

  getPriceIncrease = () => {
    return Math.ceil(
      (this.props.shop.currentprice / this.props.shop.initialprice - 1) * 100
    );
  };

  reportSpam = () => {
    this.setState({ loading: true });
    fetch("/users/spam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ shopId: this.props.shop.id })
    })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes);
        if (jsonRes.serverError) errorHandler.serverError(jsonRes);
        this.setState({ loading: false, shopMenuHidden: true });
        alert(it.spam_saved_message);
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    let button = null;
    if (this.props.shop.alreadybought || this.props.shop.inCart) {
      // button disabled
      button = this.props.shop.alreadybought ? (
        <p className="button super-small shopBox-button disabled">
          {it.shop_button_already_bought}
        </p>
      ) : (
        <p className="button super-small shopBox-button disabled">
          {it.shop_button_already_added_cart}
        </p>
      );
    } else {
      // active button
      button = (
        <p
          className="button super-small shopBox-button"
          onClick={this.handleClick}
        >
          {it.shop_button_add_to_cart}
        </p>
      );
    }

    if (this.state.loading)
      button = (
        <div className="shopBox-button">
          <Loading />
        </div>
      );

    return (
      <div id="shopBox-container" className="box">
        <div id="shopBox-header" className="flex-line">
          <img
            src={this.props.shop.logourl}
            id="shopBox-logo"
            alt="logo del negozio"
          />
          <p id="shopBox-title" onClick={this.handleClick}>
            {this.props.shop.name}
          </p>
          <div id="shopBox-settings">
            <i
              id="shopBox-settings-icon"
              className="fas fa-ellipsis-v"
              onClick={() =>
                this.setState({ shopMenuHidden: !this.state.shopMenuHidden })
              }
            ></i>
            <div
              id="shop-menu"
              style={this.state.shopMenuHidden ? { display: "none" } : null}
            >
              <p className="shop-menu-item" onClick={this.reportSpam}>
                {it.report_spam}
              </p>
            </div>
          </div>
        </div>
        <ShopBackground url={this.props.shop.backgroundurl} />
        <div id="shopBox-body-container">
          <p id="shopBox-premiums">
            {it.number_users_sold_header}{" "}
            <span className="bold">{this.props.shop.premiums}</span>{" "}
            <span className="lowercase bold">
              {this.props.shop.premiums === "1" ? it.user : it.users}
            </span>
          </p>
          <p id="shopBox-place">
            {this.props.shop.city}, {this.props.shop.province}
          </p>
          <p id="shopBox-category">{this.props.shop.category}</p>
          <div id="shopBox-goalsdone" className="flex-line">
            <PercentageLoader percentage={this.getPercentage()} />
            <p id="shopBox-restart-perc">
              {it.shop_goals_achieved_number} {this.getPercentage()}%
            </p>
          </div>
          <div id="shopBox-price" className="flex-line">
            <p id="shopBox-current">{this.props.shop.currentprice} €</p>
            <p id="shopBox-price-increment">+ {this.getPriceIncrease()}%</p>
          </div>
          {button}
        </div>
      </div>
    );
  }
}

export default withRouter(ShopBox);
