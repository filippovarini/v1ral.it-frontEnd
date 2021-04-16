import React, { Component } from "react";

import it from "../../../locales/it.json";

export class Gallery extends Component {
  render() {
    return (
      <div id="shop-aside-gallery" className="shop-aside-box box">
        <p className="shop-aside-header">{it.gallery}</p>
        <div id="shop-gallery-images-container">
          {this.props.images.map((url, i) => (
            <div
              key={i}
              className="shop-aside-image"
              onClick={() => this.props.zoomImage(i)}
              style={{ backgroundImage: `url(${url}` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

export default Gallery;
