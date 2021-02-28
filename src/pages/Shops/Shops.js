import React, { Component } from "react";
import "./shops.css";

import ShopBox from "./components/ShopBox";

//data
import shops from "../../faqData/Shops";

export class Shops extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <p id="shops-description">
          Scegli uno o più imprese nel quale diventare premium client e poter
          godere dei vantaggi offerti.
        </p>
        <div className="shops-container">
          <p className="shops-text">FILTRA PER:</p>
          <p className="shops-filter button">CITTÀ</p>
          <p className="shops-filter button">CATEGORIA</p>
        </div>
        <div className="shops-container">
          <p className="shops-text">ORDINA PER:</p>
          <p className=" shops-order-button">CASI</p>
          <p className=" shops-order-button">BISOGNO</p>
        </div>
        <div id="shopBoxes-container">
          {shops.map(shop => (
            <ShopBox key={shops.indexOf(shop)} shop={shop} />
          ))}
        </div>
      </div>
    );
  }
}

export default Shops;
