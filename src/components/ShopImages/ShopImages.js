import React, { Component } from "react";
import "./shopImages.css";

/** Renders images header of shop profile
 * @param backgroundurl
 * @param logourl
 */
export class ShopImages extends Component {
  render() {
    return (
      <div id="shop-images" className="box">
        <div id="shop-background-container">
          <img
            id="shop-background"
            className="shop-image"
            src={this.props.backgroundurl}
            alt="imagine sfondo dell'impresa"
          />
        </div>
        <img
          id="shop-logo"
          className="shop-image"
          src={this.props.logourl}
          alt="logo dell'impresa"
        />
      </div>
    );
  }
}

export default ShopImages;
