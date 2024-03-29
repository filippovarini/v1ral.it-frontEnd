import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./shopRegisterComponents.css";

import it from "../../../locales/it.json";

import ShopHowItWorks from "../../../components/ShopRegisterConvincers/ShopHowItWorks";
import WhyShouldIDoIt from "../../../components/ShopRegisterConvincers/WhyShouldShopDoIt";

/** Returns the header of component
 * @param navState
 */
export class ServicesHeader extends Component {
  state = {
    howItWorksHidden: true,
    whyShouldIDoItHidden: true
  };

  toggleHowItWorks = () => {
    this.setState({ howItWorksHidden: !this.state.howItWorksHidden });
  };

  toggleWhyShouldIDoIt = () => {
    this.setState({ whyShouldIDoItHidden: !this.state.whyShouldIDoItHidden });
  };

  render() {
    return (
      <div id="shopRegister-header" className="box">
        <ShopHowItWorks
          hidden={this.state.howItWorksHidden}
          hide={this.toggleHowItWorks}
        />
        <WhyShouldIDoIt
          hidden={this.state.whyShouldIDoItHidden}
          hide={this.toggleWhyShouldIDoIt}
        />
        <div id="shopRegister-header-container">
          <div
            className={`header-step-container ${
              this.props.navState === 0 ? "active" : null
            }`}
            onClick={() => this.props.history.push("/shop/register/bio")}
          >
            <p className="header-step-icon">01</p>
            <p className="header-step-title">
              {it.shop_register_nav_first_step}
            </p>
          </div>
          <div
            className={`header-step-container ${
              this.props.navState === 1 ? "active" : null
            }`}
            onClick={() =>
              this.props.history.push("/shop/register/credentials")
            }
          >
            <p className="header-step-icon">02</p>
            <p className="header-step-title">
              {it.shop_register_nav_second_step}
            </p>
          </div>
          <div
            className={`header-step-container ${
              this.props.navState === 2 ? "active" : null
            }`}
            onClick={() => this.props.history.push("/shop/register/stock")}
          >
            <p className="header-step-icon">03</p>
            <p className="header-step-title">
              {it.shop_register_nav_third_step}
            </p>
          </div>
        </div>
        <div id="header-line2" className="flex-line">
          <p
            id="shopRegister-how-it-works"
            className="button super-small style3 header-button"
            onClick={this.toggleHowItWorks}
          >
            {it.shop_register_how_it_works}
          </p>
          <p
            id="shopRegister-why-register"
            className="button super-small style3 header-button"
            onClick={this.toggleWhyShouldIDoIt}
          >
            {it.shop_register_why_register}
          </p>
          <p id="shop-register-help">
            {it.shop_register_help}{" "}
            <a
              href={`tel:${it.client_service_number_row}`}
              id="shop-register-help-number"
            >
              {it.client_service_number_formatted}
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(ServicesHeader);
