import React, { Component } from "react";
import "./explanaiton.css";

import it from "../../../../locales/it.json";

import HowItWorksBox from "../../../../components/HowItWorksBox/HowItWorksBox";
// images
import userStep1 from "../../../../images/user-step1.png";
import userStep2 from "../../../../images/user-step2.png";
import userStep3 from "../../../../images/user-step3.png";
import shopStep1 from "../../../../images/shop-step1.png";
import shopStep2 from "../../../../images/shop-step2.png";
import shopStep3 from "../../../../images/shop-step3.png";

/** Shows how the service works */
export class Explanaiton extends Component {
  state = {
    type: "user",
    numberOfBoxes: [1, 2, 3],
    imageMap: {
      user1: userStep1,
      user2: userStep2,
      user3: userStep3,
      shop1: shopStep1,
      shop2: shopStep2,
      shop3: shopStep3
    }
  };

  render() {
    return (
      <div id="home-explanaiton">
        <p id="home-explanaiton-header">{it.explanaiton_header}</p>
        <div id="home-explanaiton-nav" className="flex-line">
          <p
            id="exp-nav-user"
            className={`exp-nav-item button small style2 ${
              this.state.type === "user" ? "clicked" : null
            }`}
            onClick={() => this.setState({ type: "user" })}
          >
            {it.user}
          </p>
          <p
            id="exp-nav-shop"
            className={`exp-nav-item button small style2 ${
              this.state.type === "shop" ? "clicked" : null
            }`}
            onClick={() => this.setState({ type: "shop" })}
          >
            {it.shop}
          </p>
        </div>
        <div id="explanaiton-boxes">
          {this.state.numberOfBoxes.map(n => {
            return (
              <HowItWorksBox
                key={n}
                explanaiton={{
                  nav: n,
                  title: it[`${this.state.type}_step_${n}_title`],
                  img: this.state.imageMap[`${this.state.type}${n}`],
                  description: it[`${this.state.type}_step_${n}_description`]
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Explanaiton;
