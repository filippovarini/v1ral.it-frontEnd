/* PROPS
type: viral / premium
services: [{icon, title}] */

import React, { Component } from "react";
import "./serviceBox.css";

export class ServiceBox extends Component {
  render() {
    return (
      <div id="serviceBox" className="box">
        <p id="serviceBox-type">{this.props.type}</p>
        {this.props.services.map(service => {
          return (
            <div
              className="serviceBox-container"
              key={this.props.services.indexOf(service)}
            >
              <img
                className="serviceBox-icon"
                src={service.icon}
                alt="icona servizio"
              />
              <p className="serviceBox-title">{service.title}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ServiceBox;
