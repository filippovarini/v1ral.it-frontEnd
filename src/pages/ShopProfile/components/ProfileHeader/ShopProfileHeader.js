/* PROPS
- name
- goalsDone
- goalsDonePercentage
- totalCases
- description
- dailyCases */

import React, { Component } from "react";
import "./shopProfileHeader.css";

export class ShopProfileHeader extends Component {
  render() {
    return (
      <div id="shopProfile-header">
        <p id="shopProfle-name">{this.props.name}</p>
        <div id="shopProfile-info-container">
          <div className="shopProfile-info">
            <p className="shopProfile-info-number">{this.props.goalsDone}</p>
            <p className="shopProfile-info-description">obbiettivi raggiunti</p>
          </div>
          <div className="shopProfile-info">
            <p className="shopProfile-info-number">{this.props.totalCases}</p>
            <p className="shopProfile-info-description">contagi</p>
          </div>
          <div className="shopProfile-info">
            <p className="shopProfile-info-number">{this.props.dailyCases}</p>
            <p className="shopProfile-info-description">casi giornalieri</p>
          </div>
        </div>
        <div>
          <p id="shopProfile-description">{this.props.description}</p>
          <div id="shopProfile-goalsDone-container">
            <p>Obbiettivi ragiunti:</p>
            <div id="shopProfile-goalsDone-loader-container">
              <div
                id="shopProfile-goalsDone-loader"
                style={{ width: `${this.props.goalsDonePercentage}%` }}
              ></div>
            </div>
            <p>{this.props.goalsDonePercentage}%</p>
          </div>
        </div>
        <p id="shopProfile-support" className="button">
          CONTAGIATI QUI
        </p>
      </div>
    );
  }
}

export default ShopProfileHeader;