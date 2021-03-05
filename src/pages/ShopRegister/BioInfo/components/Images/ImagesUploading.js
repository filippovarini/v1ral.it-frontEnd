import React, { Component } from "react";
import "./imagesUploading.css";

export class ImagesUploading extends Component {
  render() {
    return (
      <div id="bioInfo-images">
        <div id="bioInfo-bacground" className="bioInfo-image-input">
          <i className="fas fa-camera "></i>
        </div>
        <div id="bioInfo-logo" className="bioInfo-image-input">
          <i className="fas fa-camera"></i>
        </div>
      </div>
    );
  }
}

export default ImagesUploading;
