import React, { Component } from "react";

/**
 * AddInfo component
 */
import HideCross from "../../../../components/HideCross/HideCross";

import icons from "../../../../faqData/icons";

/** List of icons for services
 * @param addIcon function to fire on click
 * @param hide hide icon popUp function
 * @param hidden
 */
export class Icons extends Component {
  render() {
    return (
      <div
        id="icons-container"
        className="popUp"
        style={this.props.hidden ? { display: "none" } : null}
      >
        <p id="icons-header">Scegli un'icona</p>
        <div id="icons-image-container">
          <HideCross hide={this.props.hideIcons} />
          {icons.map((icon, i) => {
            return (
              <div
                key={i}
                className="service-icon pointer"
                onClick={() => this.props.addIcon(icon)}
              >
                <img src={icon} alt="icon for service" />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Icons;