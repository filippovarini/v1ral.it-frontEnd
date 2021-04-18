import React, { Component } from "react";
import pageDescriptionImage from "../../images/user-step1.png";
import "./shops.css";

import errorHandler from "../../functions/errorHandler";
import it from "../../locales/it.json";

import ShopBox from "../../components/ShopBox/ShopBox";
import Loading from "../../components/Loading/Loading";
import Filter from "./Filter";
import PageDescription from "../../components/PageDescription/PageDescription";
import ViralUserTick from "../../components/ViralUserTick/ViralUserTick";
import InsertedFilters from "./InsertedFilters";

export class Shops extends Component {
  state = {
    loading: true,
    shops: null,
    shopSI: null,
    cityFilterHidden: true,
    categoryFilterHidden: true,
    cities: null,
    categories: null,
    challenger: null,
    challengerViral: null
  };

  toggleFilter = id => {
    this.setState({ [id]: !this.state[id] });
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    if (!this.state.shops) {
      fetch("page/shops")
        .then(res => res.json())
        .then(jsonRes => {
          if (jsonRes.success)
            this.setState({
              shops: jsonRes.shops,
              shopSI: jsonRes.shopSI,
              cities: jsonRes.cities,
              categories: jsonRes.categories,
              challenger: jsonRes.challenger,
              challengerViral: jsonRes.challengerViral
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

  resetShopSI = () => {
    this.setState({ loading: true });
    fetch("/shop/shopSI", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: null
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          window.location = window.location.pathname;
        } else {
          errorHandler.serverError(jsonRes);
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    const body = this.state.shops ? (
      <div>
        <PageDescription
          header={it.shops_page_description_header}
          text={it.shops_page_description_text}
          image={pageDescriptionImage}
        />
        <div id="shops-page-sub-header">
          {this.state.challenger ? (
            <p id="shops-challenger">
              Challenger:{" "}
              <span id="shops-challenger-name">{this.state.challenger}</span>
              {this.state.challengerViral ? (
                <ViralUserTick class="small" />
              ) : null}
            </p>
          ) : null}

          <div id="shops-filter-settings" className="flex-line">
            {this.state.shopSI ? (
              <InsertedFilters shopSI={this.state.shopSI} />
            ) : null}

            <div id="shops-filter-input" className="filter-header">
              <p>{it.filter_for}</p>
              <div id="shops-filter-input-wrapper" className="flex-line">
                <p
                  className="shops-filter button super-small style3"
                  onClick={() => this.setState({ cityFilterHidden: false })}
                >
                  {it.shop_city}
                </p>
                <p
                  className="shops-filter button super-small style3"
                  onClick={() => this.setState({ categoryFilterHidden: false })}
                >
                  {it.shop_category}
                </p>
              </div>
              <p id="shops-filter-reset" onClick={this.resetShopSI}>
                {it.reset_filters}
              </p>
            </div>
          </div>
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
        <div className="shopBoxes-container">
          {this.state.shops.length > 0 ? (
            this.state.shops.map((shop, i) => <ShopBox key={i} shop={shop} />)
          ) : (
            <div id="empty-shops" className="communication-panel">
              <p className="communication-panel-header">
                {it.no_shops_found_header}
              </p>
              <p className="communication-panel-text">
                {it.no_shops_found_description}
              </p>
              <p
                className="button communication-panel-button"
                onClick={this.resetShopSI}
              >
                {it.reset_filters}
              </p>
            </div>
          )}
        </div>
      </div>
    ) : null;

    return this.state.loading ? <Loading class="page-loading" /> : body;
  }
}

export default Shops;
