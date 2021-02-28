/* PROPS
boxes: [{type, services}] */

import React, { Component } from "react";
import "./serviceBox.css";

import ServiceBox from "./ServiceBox";

export class ServiceBoxes extends Component {
  render() {
    return (
      <div id="shopProfile-serviceBox-container">
        {this.props.boxes.map(box => {
          return (
            <ServiceBox
              services={box.services}
              type={box.type}
              key={this.props.boxes.indexOf(box)}
            />
          );
        })}
      </div>
    );
  }
}

export default ServiceBoxes;
