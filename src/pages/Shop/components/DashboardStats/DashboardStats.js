import React, { Component } from "react";
import "./dashboardStats.css";
import goToDashboard from "../../../../functions/goToDashboard";
import it from "../../../../locales/it.json";

import StatsBox from "./StatsBox";
import SmallLoading from "../../../../components/Loading/SmallLoading";

/** Renders dashboard body stats
 * @param data {views, lordEarnings, marketingExpenditures}
 * @param connectedId
 */
export class DashboardStats extends Component {
  state = {
    buttonLoading: false
  };

  /** Redirect shop user to stripe payments dashboard */
  goToDashboard = () => {
    this.setState({ buttonLoading: true });
    goToDashboard(window.location.pathname.slice(1), this.props.connectedId);
  };

  render() {
    return (
      <div className="body-box dark-box-container">
        <div id="stats-header" className="flex-line">
          <p className="body-box-header dark">{it.shop_dashboard_data}</p>
          {this.state.buttonLoading ? (
            <div style={{ textAlign: "right" }}>
              <SmallLoading class={"white"} />
            </div>
          ) : (
            <p id="stats-redirect" onClick={this.goToDashboard}>
              {it.settings_connect_dashboard}{" "}
              <i className="fas fa-long-arrow-alt-right"></i>
            </p>
          )}
        </div>
        <div id="stats-body" className="flex-line dark-box-body">
          <StatsBox
            data={this.props.data.views}
            title={it.shop_clicks}
            icon={<i className="fas fa-eye dark-box-icon dark-box-text"></i>}
            description={it.shop_clicks_description}
          />
          <StatsBox
            data={`${this.props.data.lordEarnings} €`}
            title={it.shop_earned_so_far}
            icon={<i className="fas fa-wallet dark-box-icon dark-box-text"></i>}
            description={it.shop_earned_so_far_description}
          />
          <StatsBox
            data={`${this.props.data.marketingExpenditures} €`}
            title={it.shop_spent_so_far}
            icon={
              <i className="fas fa-share-alt-square dark-box-icon dark-box-text"></i>
            }
            description={it.shop_spent_so_far_description}
          />
        </div>
      </div>
    );
  }
}

export default DashboardStats;
