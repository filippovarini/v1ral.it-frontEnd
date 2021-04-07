import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./button.css";

import it from "../../../../locales/it.json";

export class HomeButton extends Component {
  render() {
    return (
      <div id="home-button-container">
        <p id="challgne-text">{it.home_description_above_button}</p>
        <Link to="/shops" id="home-button" className="button">
          {this.props.loading ? "loading..." : it.take_part_in_the_challenge}
        </Link>
      </div>
    );
  }
}

export default HomeButton;
