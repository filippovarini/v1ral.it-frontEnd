import React, { Component } from "react";
import "./loading.css";

import it from "../../locales/it.json";

import Loading from "./Loading";

/** Big loading animation that prevents the user from clicking anything else
 * @param hidden
 */
export class TransactionLoading extends Component {
  render() {
    return (
      <div
        className="transaction-loading centering"
        style={this.props.hidden ? { display: "none" } : {}}
      >
        <div>
          <p className="transaction-loading-header">{it.transaction_loading}</p>
          <Loading />
        </div>
      </div>
    );
  }
}

export default TransactionLoading;
