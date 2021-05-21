import React, { Component } from "react";

import it from "../../../locales/it.json";

import DashboardStats from "./DashboardStats/DashboardStats";
import Priviledges from "../../../components/Priviledge/Priviledges/Priviledges";

const faqDashboardStats = {
  views: 123,
  lordEarnings: 1234,
  marketingExpenditures: 321
};

/** Renders shop body different pages based on navstate
 * @param navState
 * @param priviledges
 * @param shop
 */
export class ShopBody extends Component {
  state = {
    barChartWidth: 0
  };

  render() {
    return this.props.priviledges ? (
      <div id="shop-body">
        {this.props.dashboard ? (
          <DashboardStats
            data={faqDashboardStats}
            connectedId={this.props.shop.connectedId}
          />
        ) : null}

        <Priviledges
          header={it.v1ral_pass_privs}
          priviledges={this.props.priviledges.filter(
            priv => priv.type === "v1ralPass"
          )}
        />

        <Priviledges
          header={it.stock_privs}
          priviledges={this.props.priviledges.filter(
            priv => priv.type === "stock"
          )}
        />
      </div>
    ) : null;
  }
}

export default ShopBody;
