/* Props:
- totalCases
- dailyCases
- dailyIncrement
- rtIndex
- supportedShops
- supportIncrement
-  */

import React, { Component } from "react";
import "./statistics.css";

// functions
import printIncrement from "../../../../functions/printIncrement";
import classFromIncrement from "../../../../functions/classFromIncrement";

export class QuickFacts extends Component {
  state = {
    loading: true,
    info: null
  };

  render() {
    const body = (
      <div className="statistics-box box quick-facts quick-facts-flex">
        <div className="facts-container">
          <div className="fact">
            <p className="fact-title">Totale Positivi</p>
            <div className="fact-data">
              <p>{this.props.totalCases}</p>
            </div>
          </div>
          <div className="fact">
            <p className="fact-title">Positivi Oggi</p>
            <div className="fact-data">
              <p>{this.props.dailyCases}</p>
              <p
                className={`fact-aside ${classFromIncrement(
                  this.props.dailyIncrement
                )}`}
              >
                {printIncrement(this.props.dailyIncrement, true)}
              </p>
            </div>
          </div>
          <div className="fact">
            <p className="fact-title">Indice Rt</p>
            <div className="fact-data">
              <p>{this.props.rtIndex}</p>
            </div>
          </div>
          <div className="fact">
            <p className="fact-title">Imprese Finanziate</p>
            <div className="fact-data">
              <p>{this.props.supportedShops}</p>
              <p
                className={`fact-aside ${classFromIncrement(
                  this.props.supportIncrement
                )}`}
              >
                {printIncrement(this.props.supportIncrement, false)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );

    return body;
  }
}

export default QuickFacts;
