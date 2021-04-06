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

    const logoBody = this.props.logourl ? logoSubmitted : logoInput;

    const backgroundSubmitted = (
      <div
        id="background-submitted"
        className="shop-images"
        style={{ backgroundImage: `url(${this.props.backgroundurl})` }}
      >
        <i
          className="fas fa-times hide-cross centering"
          onClick={() => this.props.resetUrl("backgroundurl")}
        ></i>
        {logoBody}
      </div>
    );

    const backgroundSubmitting = (
      <div id="background-submitting" className="box shop-images">
        {backgroundInput}
        {logoBody}
      </div>
    );

    const body = this.props.backgroundurl
      ? backgroundSubmitted
      : backgroundSubmitting;

    return body;
  }
}

export default ShopImages;
