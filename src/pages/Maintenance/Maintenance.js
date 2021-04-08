import React, { Component } from "react";
import it from "../../locales/it.json";
import maintenanceImg from "../../images/logo-white.png";
import "./maintenance.css";

export class Maintenance extends Component {
  render() {
    return (
      <div id="maintenance-wrapper" className="centering">
        <img
          id="maintenance-img"
          src={maintenanceImg}
          alt="imagine di manutenzione"
        />
        <p id="maintenance-description">{it.maintenance_description}</p>
      </div>
    );
  }
}

export default Maintenance;
