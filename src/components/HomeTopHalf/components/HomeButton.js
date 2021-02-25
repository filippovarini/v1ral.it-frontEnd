import React, { Component } from "react";
import "../topHalf.css";

import buttonStyle from "../../../style/button";

export class HomeButton extends Component {
  state = {
    style: buttonStyle.normal
  };
  render() {
    return (
      <div id="home-button-container">
        <p id="challgne-text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime,
          beatae.
        </p>
        <p
          id="home-button"
          style={this.state.style}
          onMouseEnter={() => this.setState({ style: buttonStyle.hover })}
          onMouseLeave={() => this.setState({ style: buttonStyle.normal })}
        >
          CONTAGIATI
        </p>
      </div>
    );
  }
}

export default HomeButton;
