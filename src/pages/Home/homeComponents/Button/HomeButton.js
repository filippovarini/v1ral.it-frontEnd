import React, { Component } from "react";
import "./button.css";

export class HomeButton extends Component {
  render() {
    return (
      <div id="home-button-container">
        <p id="challgne-text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime,
          beatae.
        </p>
        <p id="home-button" className="button" onClick={this.props.show}>
          CONTAGIATI
        </p>
      </div>
    );
  }
}

export default HomeButton;
