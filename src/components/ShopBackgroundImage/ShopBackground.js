import React, { Component } from "react";
import "./shopBackground.css";

/** Renders shop background image
 * @param url
 * @param handleImageChange? function to call to post url
 * @param resetUrl? function to reset image
 */
export class ShopBackground extends Component {
  render() {
    const staticBody = (
      <div
        id="shop-background-image"
        style={{ backgroundImage: `url(${this.props.url})` }}
      ></div>
    );

    const inputBody = (
      <div id="shop-background-image">
        <label
          id="background-input-label"
          htmlFor="backgroundurl"
          className="centering input-label"
        >
          <i className="fas fa-camera"></i>
          <span>sfondo</span>
        </label>
        <input
          id="backgroundurl"
          type="file"
          onChange={this.props.handleImageChange}
          className="hidden"
          accept="image/*"
        />
      </div>
    );

    const body = this.props.handleImageChange ? inputBody : staticBody;

    return body;
  }
}

export default ShopBackground;
