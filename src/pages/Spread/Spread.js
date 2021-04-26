import React, { Component } from "react";
import "./spread.css";

import errorHandler from "../../functions/errorHandler";

import Loading from "../../components/Loading/Loading";
import Product from "../../components/ProductBox/ProductBox";
import SpreadStats from "./SpreadStats";

export class Spread extends Component {
  state = {
    loading: true,
    products: null,
    productsBought: null
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
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

  render() {
    const body = this.state.products ? (
      <div>
        <p id="spread-header" className="page-header">
          Aumenta i contagi
        </p>
        <div id="spread-wrapper">
          <div id="spread-products-container" className="spread-container">
            {this.state.products.map((product, i) => {
              return <Product key={i} product={product} />;
            })}
          </div>
          <div id="spread-stats-container" className="spread-container">
            <SpreadStats />
            <p
              onClick={() => this.props.history.push("/shop/checkout")}
              className="button"
              id="spread-button"
            >
              CHECKOUT
            </p>
          </div>
        </div>
      </div>
    ) : null;
    return (
      <div className="page-wrapper">
        {this.state.loading ? <Loading /> : body}
      </div>
    );
  }
}

export default Spread;
