import React, { Component } from "react";
import "./imageZoomed.css";
import it from "../../locales/it.json";

/** Renders image zoomed
 * @param image
 * @param handleClicks
 * @param hide
 * @param deleteImage function to fire to delete the image
 */
export class ImageZoomed extends Component {
  handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(it.confirm_delete_image)) {
      this.props.deleteImage();
    }
  };

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
        {this.props.deleteImage ? (
          <p id="image-zoomed-delete" onClick={this.handleDelete}>
            <i className="fas fa-trash-alt"></i> {it.delete_image}
          </p>
        ) : null}
      </div>
    );
  }
}

export default ImageZoomed;
