/* PROPS
type: viral / premium / goal
body: [{title, otherData}]
editing: boolean
handleClick(type)
*/
import React, { Component } from "react";
import "./serviceBox.css";

import ServiceBody from "./serviceBody";

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
        {this.props.services.map((service, i) => {
          return (
            <ServiceBody
              key={i}
              title={service.title}
              otherData={service.otherData}
              type={this.props.type}
            />
          );
        })}
        {editingBody}
      </div>
    );
  }
}

export default ServiceBox;
