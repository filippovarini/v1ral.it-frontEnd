import React, { Component } from "react";
import it from "../../../locales/it.json";

/** Box with all contacts */
export class Contacts extends Component {
  render() {
    return (
      <div
        id="help-contacts"
        className="box body-box"
        style={{ marginTop: "20px" }}
      >
        <p className="body-box-header">{it.contacts}</p>
        <div className="flex-line body-box-line">
          <i className="fas fa-envelope body-box-icon"></i>
          <a
            href={`mailto:${it.client_service_email}`}
            className="body-box-text"
          >
            {it.client_service_email}
          </a>
        </div>
        <div className="flex-line body-box-line">
          <i className="fas fa-mobile body-box-icon"></i>
          <a
            href={`tel:${it.client_service_number_row}`}
            className="body-box-text"
          >
            {it.client_service_number_formatted}
          </a>
        </div>
      </div>
    );
  }
}

export default Contacts;
