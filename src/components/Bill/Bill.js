import React, { Component } from "react";
import "./bill.css";

/** Show checkout bill
 * @param items [{name, price}]
 */
export class Bill extends Component {
  getTotal = () => {
    if (this.props.items) {
      return this.props.items.reduce((acc, item) => acc + item.price, 0);
    } else return 0;
  };
  render() {
    return (
      <div id="bill">
        <p id="bill-header">Conto definitivo</p>
        <div id="bill-items-container">
          {this.props.items.map((item, i) => {
            return (
              <div key={i} className="bill-item flex-line">
                <p className="bill-item-name">{item.name}</p>
                <p className="bill-item-price">{item.price} €</p>
              </div>
            );
          })}
        </div>
        <div id="bill-total" className="bill-item flex-line">
          <p className="bill-item-name">Totale</p>
          <p className="bill-item-price">{this.getTotal()} €</p>
        </div>
      </div>
    );
  }
}

export default Bill;
