import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./error.css";
import it from "../../locales/it.json";
import image from "../../images/not-found.png";

export class Error extends Component {
  render() {
    return (
      <div>
        <p id="error-header">{it.error_header}</p>
        <img id="error-image" src={image} alt="errore" />
        <div id="error-body">
          <p id="error-description">{it.error_description}</p>
          <a href="/help" id="error-client-service-link" className="button">
            {it.client_service_link}
          </a>
        </div>
      </div>
    );
  }
}

export default Error;
