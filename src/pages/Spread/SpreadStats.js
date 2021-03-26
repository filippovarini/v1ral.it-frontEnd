import React, { Component } from "react";

export class SpreadStats extends Component {
  render() {
    return (
      <div className="statistics-box box quick-facts quick-facts-wide quick-facts-margin">
        <p className="facts-header">Dati</p>
        <div className="facts-container">
          <div className="fact">
            <p className="fact-title">test data</p>
            <p className="fact-data">10</p>
          </div>
          <div className="fact">
            <p className="fact-title">test data</p>
            <p className="fact-data">10</p>
          </div>
          <div className="fact">
            <p className="fact-title">test data</p>
            <p className="fact-data">10</p>
          </div>
          <div className="fact">
            <p className="fact-title">test data</p>
            <p className="fact-data">10</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SpreadStats;
