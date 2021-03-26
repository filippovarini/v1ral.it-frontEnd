import React, { Component } from "react";
import "./spread.css";

import errorHandler from "../../functions/errorHandler";

import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import Product from "../../components/ProductBox/ProductBox";
import SpreadStats from "./SpreadStats";

export class Spread extends Component {
  state = {
    loading: true,
    products: null,
    productsBought: null,
    cart: []
  };

  componentDidMount = () => {
    fetch("/page/spread")
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          this.setState({
            loading: false,
            products: jsonRes.products,
            productsBought: jsonRes.productsBought
          });
        } else if (jsonRes.unauthorized) {
          this.props.history.push("/");
        } else errorHandler.serverError(jsonRes);
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  addToCart = name => {
    this.setState({ cart: [...this.state.cart, name] });
  };

  removeFromCart = name => {
    this.setState({
      cart: this.state.cart.filter(productName => productName !== name)
    });
  };

  render() {
    console.log(this.state.products);
    const body = this.state.products ? (
      <div>
        <p id="spread-header" className="page-header">
          Aumenta i contagi
        </p>
        <div id="spread-wrapper">
          <div id="spread-products-container" className="spread-container">
            {Object.keys(this.state.products).map((productName, i) => {
              return (
                <Product
                  key={i}
                  name={productName}
                  description={this.state.products[productName].description}
                  images={this.state.products[productName].images}
                  inCart={this.state.cart.includes(productName)}
                  addToCart={this.addToCart}
                />
              );
            })}
          </div>
          <div id="spread-stats-container" className="spread-container">
            <SpreadStats />
            <p className="button">CHECKOUT</p>
          </div>
        </div>
      </div>
    ) : null;
    return (
      <div>
        <Header />
        <div className="page-wrapper">
          {this.state.loading ? <Loading /> : body}
        </div>
      </div>
    );
  }
}

export default Spread;
