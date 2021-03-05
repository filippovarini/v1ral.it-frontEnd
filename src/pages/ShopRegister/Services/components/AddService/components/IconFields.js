import React, { Component } from "react";
import "./addServiceComponents.css";

/* PROPS:
url
showIcons 
removeIcon
*/
export class IconFiels extends Component {
  render() {
    const submitted = (
      <div className="icon service-icon">
        <div id="hideCross-container" onClick={this.props.removeIcon}>
          <i className="fas fa-times"></i>
        </div>
        <img src={this.props.url} alt="Icona servizio offerto" />
      </div>
    );

    const input = (
      <p id="icon-input-label" onClick={this.props.showIcons}>
        <i className="fas fa-camera"></i>
      </p>
    );

    const body = this.props.url ? submitted : input;

    return body;
  }
}

export default IconFiels;
