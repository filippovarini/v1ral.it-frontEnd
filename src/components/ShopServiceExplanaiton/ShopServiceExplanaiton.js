import React, { Component } from "react";
import "./serviceExplanaiton.css";

// language
import it from "../../locales/it.json";

import Services from "../Services/Services";
import Goals from "../Goals/Goals";

import serviceExplanaitonImg from "../../images/shop-support.png";

/** Returns the body of "where does the money go?" showing services and goals
 * @param services
 * @param goals
 */
export class ShopServiceExplanaiton extends Component {
  render() {
    return (
      <div id="service-explanaiton-wrapper" className="box">
        <div id="service-explanaiton-container" className="flex-line">
          <p id="service-explanaiton-text">
            {it.shop_profile_what_happens_with_money}
          </p>
          <img
            id="service-explanaiton-img"
            src={serviceExplanaitonImg}
            alt="Aiuta il locale"
          />
        </div>
        <div id="boxes-container" className="flex-line">
          <Services services={this.props.services || []} />
          <Goals goals={this.props.goals || []} />
        </div>
      </div>
    );
  }
}

export default ShopServiceExplanaiton;
