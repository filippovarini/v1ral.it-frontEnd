import React, { Component } from "react";

// language
import it from "../../locales/it.json";

const boxesHeight = "350px";

/** Display key dashboard info
 * @param clicks
 * @param totalEarned
 * @param totalSpent total amount the shop has spent with "spread the virus"
 * items
 * @param email
 * @param street
 * @param postcode
 */
export class DashboardStats extends Component {
  render() {
    return (
      <div id="shop-dashboard-stats" className="flex-line">
        <div
          id="shop-stats-quickfacts"
          className=" box quick-facts quick-facts-flex"
          style={{ height: boxesHeight }}
        >
          <p className="facts-header">{it.shop_clicks_and_earned}</p>
          <div className="facts-container">
            <div className="fact">
              <p className="fact-title">{it.shop_clicks}</p>
              <div className="fact-data">
                <p>{this.props.clicks}</p>
              </div>
            </div>
            <div className="fact">
              <p className="fact-title">{it.shop_earned_so_far}</p>
              <div className="fact-data">
                <p>{this.props.totalEarned} €</p>
              </div>
            </div>
            <div className="fact">
              <p className="fact-title">{it.shop_spent_so_far}</p>
              <div className="fact-data">
                <p>{this.props.totalSpent} €</p>
              </div>
            </div>
          </div>
        </div>
        <div
          id="shop-stats-quickfacts"
          className=" box quick-facts quick-facts-flex"
          style={{ height: boxesHeight }}
        >
          <p className="facts-header">{it.shop_email_place_container}</p>
          <div className="facts-container">
            <div className="fact">
              <p className="fact-title">Email</p>
              <div className="fact-data fact-data-small">
                <p>{this.props.email}</p>
              </div>
            </div>
            <div className="fact">
              <p className="fact-title">Via</p>
              <div className="fact-data fact-data-small">
                <p>{this.props.street}</p>
              </div>
            </div>
            <div className="fact">
              <p className="fact-title">CAP</p>
              <div
                className="fact-data
              "
              >
                <p>{this.props.postcode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardStats;
