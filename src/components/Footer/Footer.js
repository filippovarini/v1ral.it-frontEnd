import React, { Component } from "react";
import { Link } from "react-router-dom";
import it from "../../locales/it.json";
import "./footer.css";

export class Footer extends Component {
  render() {
    return (
      <div id="footer" className="flex-line">
        <div id="footer-body">
          <p id="footer-body-text" className="footer-text">
            Non mollit incididunt amet quis veniam est duis. Sint cupidatat quis
            est excepteur Lorem consectetur aute laborum cupidatat et tempor
            nostrud qui. Aliqua adipisicing velit voluptate labore ipsum commodo
            incididunt nisi nostrud reprehenderit amet reprehenderit velit.
            Cupidatat magna cupidatat deserunt duis esse mollit ullamco enim.
            Exercitation aliquip officia reprehenderit cillum. Ea dolor
            voluptate ad nostrud sit sit consectetur ipsum consequat elit sit
            occaecat.
          </p>
        </div>
        <div id="footer-links">
          <a className="footer-text" href="/help">
            {it.client_service_link}
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
