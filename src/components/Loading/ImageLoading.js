import React, { Component } from "react";
import "./loading.css";

import it from "../../locales/it.json";

export class ImageLoading extends Component {
  render() {
    return (
      <div id="loading-container" className={this.props.class}>
        <div className="loadingio-spinner-eclipse-fdpsszwg9i">
          <div className="ldio-8aeouegdt7b">
            <div></div>
          </div>
        </div>
        <p>{it.loading_image}</p>
      </div>
    );
  }
}

export default ImageLoading;
