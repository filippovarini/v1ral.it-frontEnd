import React, { Component } from "react";
import it from "../../../locales/it.json";
import ServiceExplanaiton from "../../../components/ShopServiceExplanaiton/ShopServiceExplanaiton";
import BarChart from "../../../components/BarChart/BarChart";
import DashboardStats from "./DashboardStats/DashboardStats";

const faqDashboardStats = {
  views: 123,
  lordEarnings: 1234,
  marketingExpenditures: 321
};

/** Renders shop body different pages based on navstate
 * @param navState
 * @param services
 * @param goals
 * @param getBarChartWidth
 * @param shop
 */
export class ShopBody extends Component {
  state = {
    barChartWidth: 0
  };

  /** Get optimal barChart width to fit into the shop-profile-body
   * @type dashboard, profile
   */
  getBarChartWidth = () => {
    const offset = 20;
    let barChartWidth = null;
    const div = document.getElementById("shop-barChart");
    if (div) {
      barChartWidth = div.clientWidth - offset;
    }
    console.log(barChartWidth);
    return barChartWidth;
  };

  render() {
    return (
      <div id="shop-body">
        {this.props.dashboard ? (
          <DashboardStats
            data={faqDashboardStats}
            connectedId={this.props.shop.connectedid}
          />
        ) : null}
        <ServiceExplanaiton
          goals={this.props.goals}
          services={this.props.services}
        />
        <div id="shop-barChart" className="body-box box">
          <p className="body-box-header">{it.shop_donations_received}</p>
          <BarChart
            cases={this.props.cases || {}}
            width={this.getBarChartWidth()}
          />
        </div>
      </div>
    );
  }
}

export default ShopBody;
