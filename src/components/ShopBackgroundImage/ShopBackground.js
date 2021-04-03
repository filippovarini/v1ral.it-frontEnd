import React, { Component } from "react";
import "./shopBackground.css";

/** Renders shop background image
 * @param url
 */
export class ShopBackground extends Component {
  render() {
    return (
      <div
        id="shop-background-image"
        style={{ backgroundImage: `url(${this.props.url})` }}
      ></div>
    );
  }
}

export default ShopBackground;
