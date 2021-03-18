import React, { Component } from "react";
import "./shops.css";

import ShopBox from "./components/ShopBox";
import Loading from "../../components/Loading/Loading";

//data
import shops from "../../faqData/shopsList";
import Header from "../../components/Header/Header";

import errorHandler from "../Error/ErrorHandler";

export class Shops extends Component {
  state = {
    loading: true,
    shops: null
  };

  componentDidMount = () => {
    if (!this.state.shops) {
      fetch("page/shops")
        .then(res => res.json())
        .then(jsonRes => {
          if (jsonRes.success) this.setState({ shops: jsonRes.shops });
          else errorHandler(jsonRes);
          this.setState({ loading: false });
        });
    }
  };

  render() {
    const body = this.state.shops ? (
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
          {this.state.shops.map((shop, i) => (
            <ShopBox key={i} shop={shop} />
          ))}
        </div>
      </div>
    ) : null;
    return (
      <div>
        <Header titles={[{ name: "carrello" }, { name: "profilo" }]} />
        {this.state.loading ? (
          <div className="page-wrapper">
            <Loading />
          </div>
        ) : (
          body
        )}
      </div>
    );
  }
}

export default Shops;
