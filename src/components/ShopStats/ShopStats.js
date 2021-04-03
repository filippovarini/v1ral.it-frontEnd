import React, { Component } from "react";
import "./shopStats.css";

// language
import it from "../../locales/it.json";

// functions
import BarChart from "../BarChart/BarChart";

/** Show shop stats and chart
 * @param disruptionIndex
 * @param priceIncrement
 * @param placesLeft
 * @param goalsDone
 * @param cases list of cases
 */
export class ShopStats extends Component {
  render() {
    return (
      <div id="shop-stats-container">
        <div
          id="shop-stats-quickfacts"
          className="box beside-chart quick-facts quick-facts-flex"
        >
          <div className="facts-container">
            <div className="fact">
              <div className="fact-data">
                <p>{this.props.placesLeft}</p>
              </div>
              <p className="fact-title">{it.shop_places_left}</p>
            </div>
            <div className="fact">
              <div className="fact-data">
                <p className="positive">+ {this.props.priceIncrement}%</p>
              </div>
              <p className="fact-title">{it.shop_price_increase}</p>
            </div>
            <div className="fact">
              <div className="fact-data">
                <p>{this.props.disruptionIndex}</p>
              </div>
              <p className="fact-title">{it.shop_disruption_index}</p>
            </div>
            <div className="fact">
              <div className="fact-data">
                <p>{this.props.goalsDone}%</p>
              </div>
              <p className="fact-title">{it.shop_goals_achieved}</p>
            </div>
          </div>
        </div>
        <div id="shop-stats-barChart">
          <BarChart cases={this.props.cases} />
        </div>
      </div>
    );
  }
}

export default ShopStats;
