import React, { Component } from "react";
import "../bottomHalf.css";

import QuickFacts from "./QuickFacts";
import BarChart from "../../BarChart/BarChart";

import cases from "../../../faqData/casesGraph";

const totalMargin = 40;
const quickFactsWidth = 250;
const graphSize = {
  width: window.innerWidth - totalMargin - quickFactsWidth - 200,
  height: Math.round((window.screen.height * 4) / 10)
};

export class Statistics extends Component {
  render() {
    return (
      <div id="statistics-container">
        <QuickFacts
          totalCases={(134, 123, 2132)}
          dailyCases={(13, 432)}
          dailyIncrement={-10}
          rtIndex={4.53}
          supportedShops={981}
          supportIncrement={58}
        />
        <BarChart cases={cases} statisticsDimensions={graphSize} />
      </div>
    );
  }
}

export default Statistics;
