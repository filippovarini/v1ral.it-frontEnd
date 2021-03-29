import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import it from "../../locales/it.json";

/** Returns the header of component
 * @param navState
 */
export class ServicesHeader extends Component {
  render() {
    return (
      <div id="shopRegister-header-container">
        <div
          className={`header-step-container ${
            this.props.navState === 0 ? "active" : null
          }`}
          onClick={() => this.props.history.push("/shop/register/bio")}
        >
          <p className="header-step-icon">01</p>
          <p className="header-step-title">{it.shop_register_first_step}</p>
        </div>
        <div
          className={`header-step-container ${
            this.props.navState === 1 ? "active" : null
          }`}
          onClick={() => this.props.history.push("/shop/register/credentials")}
        >
          <p className="header-step-icon">02</p>
          <p className="header-step-title">{it.shop_register_second_step}</p>
        </div>
        <div
          className={`header-step-container ${
            this.props.navState === 2 ? "active" : null
          }`}
          onClick={() => this.props.history.push("/shop/register/services")}
        >
          <p className="header-step-icon">03</p>
          <p className="header-step-title">{it.shop_register_third_step}</p>
        </div>
        <div
          className={`header-step-container ${
            this.props.navState === 3 ? "active" : null
          }`}
          onClick={() => this.props.history.push("/shop/register/goals")}
        >
          <p className="header-step-icon">04</p>
          <p className="header-step-title">{it.shop_register_fourth_step}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(ServicesHeader);
