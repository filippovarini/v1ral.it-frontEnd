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

export class ShopBox extends Component {
  handleClick = () => {
    this.props.history.push(`/shop/profile/${this.props.shop.id}`);
  };

  render() {
    console.log(this.props.shop);
    return (
      <div
        id="shopBox-container"
        className="box box-hover"
        onClick={this.handleClick}
      >
        <div id="shopBox-image-container">
          <img src={this.props.shop.backgroundurl} alt="imagine del negozio" />
          <img
            src={this.props.shop.logourl}
            id="shopBox-logo"
            alt="logo del negozio"
          />
        </div>
        <div>
          <p>{this.props.shop.name}</p>
          <p>
            {this.props.shop.city}, {this.props.shop.province}
          </p>
          <p>{this.props.shop.category}</p>
          <p>{this.props.shop.goalsdone}</p>
          <p>{this.props.shop.premiums}</p>
          <p>
            {this.props.shop.alreadybought
              ? "già comprato"
              : this.props.shop.inCart
              ? "nel carrello"
              : null}
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(ShopBox);
