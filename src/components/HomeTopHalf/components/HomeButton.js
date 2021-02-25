import React, { Component } from "react";
import "../topHalf.css";

export class HomeButton extends Component {
  render() {
    return (
      <div id="home-button-container">
        <p id="challgne-text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime,
          beatae.
        </p>
        <p id="home-button" className="button">
          CONTAGIATI
        </p>
      </div>
    );
  }
}

export default HomeButton;
