import React, { Component } from "react";
import "./notFound.css";

import it from "../../locales/it.json";
import Header from "../../components/Header/Header";
import notFoundImg from "../../images/not-found.png";

export class NotFound extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="page-wrapper">
          <p id="not-found-header">{it.not_found_header}</p>
          <p id="not-found-description">{it.not_found_description}</p>
          <img id="not-found-img" src={notFoundImg} alt="imagine not found" />
        </div>
      </div>
    );
  }
}

export default NotFound;
