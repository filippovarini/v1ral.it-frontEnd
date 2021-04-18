import React, { Component } from "react";
import "./pageDescription.css";

/** Renders page description to show on top
 * @param header
 * @param text
 * @param image
 */
export class PageDescription extends Component {
  render() {
    return (
      <div className="page-description box flex-line">
        <div className="page-description-text-container">
          <p className="page-description-header">{this.props.header}</p>
          <p className="page-description-text">{this.props.text}</p>
        </div>
        <img
          src={this.props.image}
          alt="descrizione della pagina"
          className="page-description-img"
        />
      </div>
    );
  }
}

export default PageDescription;
