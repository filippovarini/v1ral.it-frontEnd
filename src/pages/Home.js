import React, { Component } from "react";

import QuickFacts from "../components/QuickFacts/QuickFacts";
import BarChart from "../components/BarChart/BarChart";
import Regions from "../components/RegionsMap/Regions";

import dailyCases from "../faqData/casesGraph";

console.log(dailyCases);

export class Home extends Component {
  render() {
    return (
      <div>
        <QuickFacts
          totalCases={(134, 123, 2132)}
          dailyCases={(13, 432)}
          dailyIncrement={-10}
          rtIndex={4.53}
          supportedShops={981}
          supportIncrement={58}
        />
        <BarChart cases={dailyCases} />
        <Regions />
      </div>
    );
  }
}

export default Home;
