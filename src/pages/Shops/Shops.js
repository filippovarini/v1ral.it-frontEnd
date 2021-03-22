import React, { Component } from "react";
import errorHandler from "../../functions/errorHandler";
import "./shops.css";

import ShopBox from "./components/ShopBox";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import Cart from "../../components/Cart/Cart";

export class Shops extends Component {
  state = {
    loading: true,
    shops: null,
    cartHidden: true
  };

  componentDidMount = () => {
    if (!this.state.shops) {
      fetch("page/shops")
        .then(res => res.json())
        .then(jsonRes => {
          if (jsonRes.success) this.setState({ shops: jsonRes.shops });
          else errorHandler.serverError(jsonRes);
          this.setState({ loading: false });
        })
        .catch(e => {
          console.log(e);
          errorHandler.clientError();
        });
    }
  };

  showCart = () => {
    this.setState({ cartHidden: false });
  };

  cartContainerClick = e => {
    if (e.target.id === "cart-container") this.setState({ cartHidden: true });
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
        <Header />
        <div
          id="cart-container"
          onClick={this.cartContainerClick}
          style={this.state.cartHidden ? { height: "0px" } : null}
        >
          <Cart />
        </div>
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
