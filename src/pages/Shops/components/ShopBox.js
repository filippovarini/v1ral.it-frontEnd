/* PROPS:
- background
- logo
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
    this.props.history.push("/shop/@username");
  };

  render() {
    return (
      <div
        id="shopBox-container"
        className="box box-hover"
        onClick={this.handleClick}
      >
        <div id="shopBox-image-container">
          <img src={this.props.shop.background} alt="imagine del negozio" />
          <img
            src={this.props.shop.logo}
            id="shopBox-logo"
            alt="logo del negozio"
          />
        </div>
        <div>
          <p>{this.props.shop.name}</p>
          <p>{this.props.shop.place}</p>
          <p>{this.props.shop.category}</p>
          <p>{this.props.shop.goalsDone}</p>
          <p>{this.props.shop.cases}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(ShopBox);
