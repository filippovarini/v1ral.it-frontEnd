/* Props:
- totalCases
- dailyCases
- dailyIncrement
- rtIndex
- supportedShops
- supportIncrement
-  */

import React, { Component } from "react";
import "../bottomHalf.css";

import colors from "../../../style/colors";

const colourFromIncrement = increment => {
  if (increment > 0) {
    return colors.positive;
  } else if (increment === 0) {
    return colors.neutral;
  } else {
    return colors.negative;
  }
};

const printIncrement = increment => {
  const sign = Math.sign(increment) < 0 ? "-" : "+";
  return `${sign}${Math.abs(increment)}% rispetto a ieri`;
};

export class QuickFacts extends Component {
  render() {
    // aside data style
    const dailyIncrementStyle = {
      color: colourFromIncrement(this.props.dailyIncrement)
    };
    const supportIncrementStyle = {
      color: colourFromIncrement(this.props.supportIncrement)
    };
    return (
      <div id="quick-facts" className="statistics-box">
        <div id="facts-container">
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
              <p className="fact-aside" style={dailyIncrementStyle}>
                {printIncrement(this.props.dailyIncrement)}
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
              <p className="fact-aside" style={supportIncrementStyle}>
                {printIncrement(this.props.supportIncrement)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuickFacts;
