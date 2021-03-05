import React, { Component } from "react";
import "./shops.css";

import ShopBox from "./components/ShopBox";

//data
import shops from "../../faqData/shopsList";
import Header from "../../components/Header/Header";

export class Shops extends Component {
  render() {
    return (
      <div>
        <Header titles={[{ name: "carrello" }, { name: "profilo" }]} />
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
            {shops.map((shop, i) => (
              <ShopBox key={i} shop={shop} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Shops;
