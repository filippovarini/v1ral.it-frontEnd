import React, { Component } from "react";
import "./imagesUploading.css";

/** Displays images
 * @param logo
 * @param background
 * @param handleImageChange function to call to post url
 * @param resetUrl function to reset image
 */
export class ImagesUploading extends Component {
  render() {
    const backgroundSubmitted = (
      <div className="bioInfo-bacground bioInfo-image-input">
        <img
          id="background"
          src={this.props.background}
          alt="imagine di sfondo del focolaio"
        />
        <i
          className="fas fa-times hide-cross"
          onClick={() => this.props.resetUrl("background")}
        ></i>
      </div>
    );

    const backgroundInput = (
      <div className="bioInfo-bacground">
        <label
          id="background-input-label"
          className="box "
          htmlFor="background"
        >
          <i className="fas fa-camera"></i>
        </label>
        <input
          id="background"
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
          <img id="logo" src={this.props.logo} alt="logo focolaio" />
          <i
            className="fas fa-times hide-cross"
            onClick={() => this.props.resetUrl("logo")}
          ></i>
        </div>
      </div>
    );

    const logoInput = (
      <div className="bioInfo-logo-container">
        <div
          className="bioInfo-image-input bioInfo-logo box"
          style={{ border: "none" }}
        >
          <label id="logo-input-label" htmlFor="logo">
            <i className="fas fa-camera"></i>
          </label>
          <input
            id="logo"
            type="file"
            onChange={this.props.handleImageChange}
            className="hidden"
            accept="image/*"
          />
        </div>
      </div>
    );

    const backgroundBody = this.props.background
      ? backgroundSubmitted
      : backgroundInput;

    const logoBody = this.props.logo ? logoSubmitted : logoInput;

    return (
      <div id="bioInfo-images">
        {backgroundBody}
        {logoBody}
      </div>
    );
  }
}

export default ImagesUploading;
