import React, { Component } from "react";
import "./shops.css";

import errorHandler from "../../functions/errorHandler";

import ShopBox from "../../components/ShopBox/ShopBox";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import Filter from "./Filter";

export class Shops extends Component {
  state = {
    loading: true,
    shops: null,
    shopSI: null,
    cityFilterHidden: true,
    categoryFilterHidden: true,
    cities: null,
    categories: null
  };

  toggleFilter = id => {
    this.setState({ [id]: !this.state[id] });
  };

  componentDidMount = () => {
    if (!this.state.shops) {
      fetch("page/shops")
        .then(res => res.json())
        .then(jsonRes => {
          if (jsonRes.success)
            this.setState({
              shops: jsonRes.shops,
              shopSI: jsonRes.shopSI,
              cities: jsonRes.cities,
              categories: jsonRes.categories
            });
          else errorHandler.serverError(jsonRes);
          this.setState({ loading: false });
        })
        .catch(e => {
          console.log(e);
          errorHandler.clientError();
        });
    }
  };

  render() {
    const insertedFilters = this.state.shopSI ? (
      <div>
        <p className="inserted-filters-header">Risultati per:</p>
        {this.state.shopSI.name ? (
          <p className="inserted-filters-text">
            Titolo: {this.state.shopSI.name}
          </p>
        ) : null}
        {this.state.shopSI.city ? (
          <p className="inserted-filters-text">
            Città: {this.state.shopSI.city}
          </p>
        ) : null}
        {this.state.shopSI.category ? (
          <p className="inserted-filters-text">
            Categoria: {this.state.shopSI.category}
          </p>
        ) : null}
      </div>
    ) : null;
    const body = this.state.shops ? (
      <div className="page-wrapper">
        <p id="shops-description">
          Scegli uno o più imprese nel quale diventare premium client e poter
          godere dei vantaggi offerti.
        </p>
        {insertedFilters}
        <div className="shops-container">
          <p className="shops-text">FILTRA PER:</p>
          <p
            className="shops-filter button"
            onClick={() => this.setState({ cityFilterHidden: false })}
          >
            CITTÀ
          </p>
          <p
            className="shops-filter button"
            onClick={() => this.setState({ categoryFilterHidden: false })}
          >
            CATEGORIA
          </p>
        </div>
        <Filter
          data={this.state.cities}
          hide={() => this.setState({ cityFilterHidden: true })}
          hidden={this.state.cityFilterHidden}
          default={this.state.shopSI ? this.state.shopSI.city : null}
          isCity={true}
        />
        <Filter
          data={this.state.categories}
          hide={() => this.setState({ categoryFilterHidden: true })}
          hidden={this.state.categoryFilterHidden}
          isCity={false}
          default={this.state.shopSI ? this.state.shopSI.category : null}
        />
        <div className="shops-container">
          <p className="shops-text">ORDINA PER:</p>
          <p className=" shops-order-button">CASI</p>
          <p className=" shops-order-button">BISOGNO</p>
        </div>
        <div className="shopBoxes-container">
          {this.state.shops.map((shop, i) => (
            <ShopBox key={i} shop={shop} />
          ))}
        </div>
      </div>
    ) : null;
    return (
      <div>
        <Header />
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
