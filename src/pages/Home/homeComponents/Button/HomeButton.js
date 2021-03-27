import React, { Component } from "react";
import "./button.css";

import it from "../../../../locales/it.json";

export class HomeButton extends Component {
  render() {
    return (
      <div id="home-button-container">
        <p id="challgne-text">{it.home_description_above_button}</p>
        <p id="home-button" className="button" onClick={this.props.click}>
          {this.props.loading ? "loading..." : it.take_part_in_the_challenge}
        </p>
      </div>
    );
  }
}

export default HomeButton;
