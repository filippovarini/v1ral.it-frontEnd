import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import it from "../../../locales/it.json";
import errorHandler from "../../../functions/errorHandler";
import Table from "../../../components/Table/Table";
import Loading from "../../../components/Loading/Loading";

export class Shops extends Component {
  state = {
    loading: true,
    info: null,
    shopSearchSI: null
  };

  componentDidMount = () => {
    if (!this.state.info) {
      fetch("page/home/shops")
        .then(res => res.json())
        .then(jsonRes => {
          if (jsonRes.success) this.setState({ info: jsonRes.shopList });
          else errorHandler.serverError(jsonRes);
          this.setState({ loading: false });
        })
        .catch(e => {
          console.log(e);
          errorHandler.clientError();
        });
    }
  };

  handleChange = e => {
    this.setState({ shopSearchSI: e.target.value });
  };

  /** Submit shop search */
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    fetch("/shop/updateSI", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ shopSI: { name: this.state.shopSearchSI } })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          window.location = "/shops";
        } else {
          errorHandler.serverError(jsonRes);
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  handleClick = id => {
    window.location = "/shop/" + id;
  };

  /** Formats data for the table */
  formatDataForTable = () => {
    if (!this.state.info) return null;
    else
      return this.state.info.map(infoObj => {
        return {
          id: infoObj.id,
          [it.shop_logo]: infoObj.logo,
          [it.shop_name]: infoObj.name,
          [it.shop_category]: infoObj.category,
          [it.shop_place]: `${infoObj.city}, ${infoObj.province}`,
          [it.shop_donations]: infoObj.premiums
        };
      });
  };

  render() {
    return (
      <div id="shops-container" className={this.props.class}>
        <form
          className="flex-line home-search-bar"
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            onChange={this.handleChange}
            className="home-search-input"
            placeholder="cerca focolaio"
          />
          <input
            className="button small home-search-submit "
            type="submit"
            value="CERCA"
            style={!this.state.shopSearchSI ? { display: "none" } : null}
          />
        </form>
        {!this.state.loading && this.state.info ? (
          <Table
            data={this.formatDataForTable()}
            firstId={true}
            handleClick={this.handleClick}
            class="overflow"
          />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default withRouter(Shops);
