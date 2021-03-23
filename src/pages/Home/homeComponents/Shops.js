/* requesrt for 
shops: [{logo, name, category, goalsDone (correct format), cases}] */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Table from "../../../components/Table/Table";
import Loading from "../../../components/Loading/Loading";

import errorHandler from "../../../functions/errorHandler";

export class Shops extends Component {
  state = {
    loading: true,
    info: null
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

  /** Formats data for the table */
  formatDataForTable = () => {
    if (!this.state.info) return null;
    else
      return this.state.info.map(infoObj => {
        return {
          logo: infoObj.logourl,
          nome: infoObj.name,
          categoria: infoObj.category,
          città: `${infoObj.city}, ${infoObj.province}`,
          positivi: infoObj.premiums,
          "indice di ripresa":
            (
              parseFloat(infoObj.financed_so_far) /
                parseFloat(infoObj.disruption_index) || 0
            ).toFixed(2) + "%"
        };
      });
  };

  render() {
    console.log(this.state.info);
    return (
      <div id="shops-container" className={this.props.class}>
        {!this.state.loading && this.state.info ? (
          <Table data={this.formatDataForTable()} />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default withRouter(Shops);
