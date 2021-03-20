/* PROPS
- name
- services
- goalsDonePercentage
- totalCases
- viralCases
- description */

import React, { Component } from "react";
import "./shopProfileHeader.css";

export class ShopProfileHeader extends Component {
  render() {
    return (
      <div id="shopProfile-header">
        <p id="shopProfle-name">{this.props.name}</p>
        <div id="shopProfile-info-container">
          <div className="shopProfile-info">
            <p className="shopProfile-info-number">{this.props.services}</p>
            <p className="shopProfile-info-description">privilegi offerti</p>
          </div>
          <div className="shopProfile-info">
            <p className="shopProfile-info-number">{this.props.totalCases}</p>
            <p className="shopProfile-info-description">contagi</p>
          </div>
          <div className="shopProfile-info">
            <p className="shopProfile-info-number">{this.props.viralCases}</p>
            <p className="shopProfile-info-description">di cui virali</p>
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
        {this.props.added ? (
          <p
            id="shopProfile-support"
            className="button button-disabled"
            // onClick={this.props.handleSubmit}
            style={{ background: "green" }}
          >
            CONTAGIANDO...
          </p>
        ) : this.props.alreadyBought ? (
          <p
            id="shopProfile-support"
            className="button button-disabled"
            // onClick={this.props.handleSubmit}
            style={{ background: "green" }}
          >
            CONTAGIATO
          </p>
        ) : (
          <p
            id="shopProfile-support"
            className="button"
            onClick={this.props.handleSubmit}
          >
            CONTAGIATI QUI
          </p>
        )}
      </div>
    );
  }
}

export default ShopProfileHeader;
