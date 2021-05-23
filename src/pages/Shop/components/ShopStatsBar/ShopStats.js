import React, { Component } from "react";
import "./shopStats.css";

// language
import it from "../../../../locales/it.json";

/** Show shop stats and chart
 * @param stockMonthDuration
 * @param priceIncrement
 * @param placesLeft
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
                <p>{this.props.stockMonthDuration} mesi</p>
              </div>
              <p className="fact-title">{it.stock_month_duration}</p>
            </div>
            <div className="fact">
              <div className="fact-data">
                <p>-1</p>
              </div>
              <p className="fact-title">altro dato</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopStats;
