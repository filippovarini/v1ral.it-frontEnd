/* PROPS
type: viral / premium 
services: [{icon, title}]
editing: boolean
handleClick(type)
*/

import React, { Component } from "react";
import "./serviceBox.css";

export class ServiceBox extends Component {
  render() {
    const editingBody = this.props.editing ? (
      <div
        id="serviceBox-plus"
        className="serviceBox-container button"
        onClick={() => this.props.handleClick(this.props.type)}
      >
        <i
          id="serviceBox-plus-icon"
          className="fas fa-plus serviceBox-icon"
        ></i>
        <p id="serviceBox-plus-title">Aggiungi</p>
      </div>
    ) : null;
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
        {editingBody}
      </div>
    );
  }
}

export default ServiceBox;
