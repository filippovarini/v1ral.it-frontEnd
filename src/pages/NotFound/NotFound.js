import React, { Component } from "react";
import "./notFound.css";

import it from "../../locales/it.json";
import notFoundImg from "../../images/not-found.png";

export class NotFound extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <p id="not-found-header">{it.not_found_header}</p>
        <p id="not-found-description">{it.not_found_description}</p>
        <img id="not-found-img" src={notFoundImg} alt="imagine not found" />
      </div>
    );
  }
}

export default NotFound;
