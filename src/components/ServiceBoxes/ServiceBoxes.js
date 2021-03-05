/* PROPS
boxes: [{type, services}]
editing
handleClick */

import React, { Component } from "react";
import "./serviceBox.css";

import ServiceBox from "./ServiceBox";

export class ServiceBoxes extends Component {
  render() {
    return (
      <div id="serviceBox-container">
        {this.props.boxes.map(box => {
          return (
            <ServiceBox
              services={box.services}
              type={box.type}
              key={this.props.boxes.indexOf(box)}
              editing={this.props.editing}
              handleClick={this.props.handleClick}
            />
          );
        })}
      </div>
    );
  }
}

export default ServiceBoxes;
