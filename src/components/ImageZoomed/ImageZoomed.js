import React, { Component } from "react";
import "./imageZoomed.css";

/** Renders image zoomed
 * @param image
 * @param handleClicks
 * @param hide
 */
export class ImageZoomed extends Component {
  render() {
    return (
      <div className="popUp-background">
        <div id="image-zoomed-container" className="popUp flex-line">
          <i
            className="fas fa-times hide-cross image-zoomed-icon"
            onClick={this.props.hide}
          ></i>
          <i
            onClick={this.props.handleClicks.prev}
            className="fas fa-chevron-left image-zoomed-icon"
            style={
              this.props.handleClicks.prev ? null : { color: "transparent" }
            }
          ></i>
          <div
            id="image-zoomed"
            style={{
              backgroundImage: `url(${this.props.image})`
            }}
          ></div>
          <i
            onClick={this.props.handleClicks.next}
            className="fas fa-chevron-right image-zoomed-icon"
            style={
              this.props.handleClicks.next ? null : { color: "transparent" }
            }
          ></i>
        </div>
      </div>
    );
  }
}

export default ImageZoomed;
