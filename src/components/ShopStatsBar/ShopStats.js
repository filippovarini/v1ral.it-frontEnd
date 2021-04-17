import React, { Component } from "react";
import "./shopStats.css";

// language
import it from "../../locales/it.json";

/** Show shop stats and chart
 * @param pass_month_duration
 * @param priceIncrement
 * @param placesLeft
 * @param goalsDone
 * @param cases list of cases
 */
export class ShopStats extends Component {
  render() {
    return (
      <div id="shop-stats-container">
        <div id="shop-stats-quickfacts" className="box quick-facts aligned">
          <div className="facts-container">
            <div className="fact">
              <div className="fact-data">
                <p>{this.props.placesLeft}</p>
              </div>
              <p className="fact-title">{it.shop_places_left}</p>
            </div>
            <div className="fact">
              <div className="fact-data">
                <p className="positive">+{this.props.priceIncrement}%</p>
              </div>
              <p className="fact-title">{it.shop_price_increase}</p>
            </div>
            <div className="fact">
              <div className="fact-data">
                <p>{this.props.pass_month_duration} mesi</p>
              </div>
              <p className="fact-title">{it.pass_month_duration}</p>
            </div>
            <div className="fact">
              <div className="fact-data">
                <p>{this.props.goalsDone}%</p>
              </div>
              <p className="fact-title">{it.shop_goals_achieved}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopStats;