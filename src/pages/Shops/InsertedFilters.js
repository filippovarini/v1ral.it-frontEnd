import React, { Component } from "react";

import it from "../../locales/it.json";

/** Returns inserted filters
 * @param shopSI
 */
export class InsertedFilters extends Component {
  render() {
    return (
      <div id="inserted-filters">
        <p className="filter-header">{it.shops_results_for}</p>
        {this.props.shopSI.name ? (
          <p className="inserted-filters-text">
            {it.shop_name}:{" "}
            <span className="inserted-filters-value">
              {this.props.shopSI.name}
            </span>
          </p>
        ) : null}
        {this.props.shopSI.city ? (
          <p className="inserted-filters-text">
            {it.shop_city}:{" "}
            <span className="inserted-filters-value">
              {this.props.shopSI.city}
            </span>
          </p>
        ) : null}
        {this.props.shopSI.category ? (
          <p className="inserted-filters-text">
            {it.shop_category}:{" "}
            <span className="inserted-filters-value">
              {this.props.shopSI.category}
            </span>
          </p>
        ) : null}
      </div>
    );
  }
}

export default InsertedFilters;
