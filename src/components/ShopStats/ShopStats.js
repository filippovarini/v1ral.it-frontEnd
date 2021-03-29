import React, { Component } from "react";
import "./shopStats.css";

// language
import it from "../../locales/it.json";

// functions
import printIncrement from "../../functions/printIncrement";
import classFromIncrement from "../../functions/classFromIncrement";
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
          className=" box quick-facts quick-facts-flex"
        >
          <div className="facts-container">
            <div className="fact">
              <p className="fact-title">{it.shop_places_left}</p>
              <div className="fact-data">
                <p>{this.props.placesLeft}</p>
              </div>
            </div>
            <div className="fact">
              <p className="fact-title">{it.shop_price_increase}</p>
              <div className="fact-data">
                <p>{this.props.priceIncrement}</p>
                <p
                  className={`fact-aside ${classFromIncrement(
                    this.props.priceIncrement
                  )}`}
                >
                  {printIncrement(this.props.priceIncrement, true)}
                </p>
              </div>
            </div>
            <div className="fact">
              <p className="fact-title">{it.shop_disruption_index}</p>
              <div className="fact-data">
                <p>{this.props.disruptionIndex}</p>
              </div>
            </div>
            <div className="fact">
              <p className="fact-title">{it.shop_goals_achieved}</p>
              <div className="fact-data">
                <p>{this.props.goalsDone}%</p>
              </div>
            </div>
          </div>
        </div>
        <BarChart cases={this.props.cases} />
      </div>
    );
  }
}

export default ShopStats;
