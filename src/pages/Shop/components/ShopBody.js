import React, { Component } from "react";

import ServiceExplanaiton from "../../../components/ShopServiceExplanaiton/ShopServiceExplanaiton";
import BarChart from "../../../components/BarChart/BarChart";

/** Renders shop body different pages based on navstate
 * @param navState
 */
export class ShopBody extends Component {
  render() {
    let bodyComponent = null;

    switch (this.props.navState) {
      case 0:
        bodyComponent = (
          <ServiceExplanaiton
            goals={this.props.goals}
            services={this.props.services}
          />
        );
        break;
      case 1:
        bodyComponent = (
          <div id="shop-barChart">
            <BarChart
              cases={this.props.cases || {}}
              width={this.props.getBarChartWidth()}
            />
          </div>
        );
        break;
      default:
        throw Error("Illegal navstate");
    }

    return bodyComponent;
  }
}

export default ShopBody;
