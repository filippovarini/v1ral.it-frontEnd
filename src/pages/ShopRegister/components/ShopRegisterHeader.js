import React, { Component } from "react";

/** Returns the header of component
 * title
 */
export class ServicesHeader extends Component {
  render() {
    return (
      <div id="service-header-container">
        <p id="service-header">{this.props.title}</p>
      </div>
    );
  }
}

export default ServicesHeader;
