import React, { Component } from "react";
import "./imagesUploading.css";

import HideCross from "../../../../../components/HideCross/HideCross";

/** Displays images
 * @param logourl
 * @param backgroundurl
 * @param handleImageChange function to call to post url
 * @param resetUrl function to reset image
 */
export class ImagesUploading extends Component {
  render() {
    const backgroundSubmitted = (
      <div className="bioInfo-bacground bioInfo-image-input">
        <img
          id="background"
          src={this.props.backgroundurl}
          alt="imagine di sfondo del focolaio"
        />
        <HideCross hide={() => this.props.resetUrl("backgroundurl")} />
      </div>
    );

    const backgroundInput = (
      <div className="bioInfo-bacground">
        <label
          id="background-input-label"
          className="box "
          htmlFor="backgroundurl"
        >
          <i className="fas fa-camera"></i>
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
      <div className="bioInfo-logo-container">
        <div className="bioInfo-image-input bioInfo-logo">
          <img id="logo" src={this.props.logourl} alt="logo focolaio" />
          <HideCross
            hide={() => this.props.resetUrl("logourl")}
            class="bottomright"
          />
        </div>
      </div>
    );

    const logoInput = (
      <div className="bioInfo-logo-container">
        <div
          className="bioInfo-image-input bioInfo-logo box"
          style={{ border: "none" }}
        >
          <label id="logo-input-label" htmlFor="logourl">
            <i className="fas fa-camera"></i>
          </label>
          <input
            id="logourl"
            type="file"
            onChange={this.props.handleImageChange}
            className="hidden"
            accept="image/*"
          />
        </div>
      </div>
    );

    const backgroundBody = this.props.backgroundurl
      ? backgroundSubmitted
      : backgroundInput;

    const logoBody = this.props.logourl ? logoSubmitted : logoInput;

    return (
      <div id="bioInfo-images">
        {backgroundBody}
        {logoBody}
      </div>
    );
  }
}

export default ImagesUploading;
