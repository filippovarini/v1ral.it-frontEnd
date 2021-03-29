import React, { Component } from "react";
import "./shopImages.css";

/** Renders images header of shop profile
 * @param backgroundurl
 * @param logourl
 * @param handleImageChange function to call to post url
 * @param resetUrl function to reset image
 * @param input whether we are in a form or not
 */
export class ShopImages extends Component {
  render() {
    const backgroundSubmitted = (
      <div className="shop-background-container">
        <img
          id="shop-background"
          className="shop-image"
          src={this.props.backgroundurl}
          alt="imagine sfondo dell'impresa"
        />
        {this.props.input ? (
          <i
            className="fas fa-times hide-cross centering"
            onClick={() => this.props.resetUrl("backgroundurl")}
          ></i>
        ) : null}
      </div>
    );

    const backgroundInput = (
      <div
        id="background-input"
        className="shop-background-container image-input"
      >
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

    const logoSubmitted = (
      <div className="centering shop-logo box">
        <img
          className="shop-image"
          src={this.props.logourl}
          alt="logo dell'impresa"
        />
        {this.props.input ? (
          <i
            id="logo-hide"
            className="fas fa-times hide-cross centering"
            onClick={() => this.props.resetUrl("logourl")}
          ></i>
        ) : null}
      </div>
    );

    const logoInput = (
      <div className="shop-logo centering image-input">
        <label
          id="logo-input-label"
          className="centering input-label"
          htmlFor="logourl"
        >
          <i className="fas fa-camera"></i>
          <span>logo</span>
        </label>
        <input
          id="logourl"
          type="file"
          onChange={this.props.handleImageChange}
          className="hidden"
          accept="image/*"
        />
      </div>
    );

    const backgroundBody = this.props.backgroundurl
      ? backgroundSubmitted
      : backgroundInput;

    const logoBody = this.props.logourl ? logoSubmitted : logoInput;

    return (
      <div id="shop-images" className="box">
        {backgroundBody}
        {logoBody}
      </div>
    );
  }
}

export default ShopImages;
