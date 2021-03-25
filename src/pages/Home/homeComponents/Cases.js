/* find
shops: [{logo, name, category, goalsDone (correct format), cases}] */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import errorHandler from "../../../functions/errorHandler";

import Table from "../../../components/Table/Table";
import Loading from "../../../components/Loading/Loading";

export class Shops extends Component {
  state = {
    loading: true,
    info: null,
    userSearchSI: null
  };

  componentDidMount = () => {
    if (!this.state.info) {
      fetch("page/home/users")
        .then(res => res.json())
        .then(jsonRes => {
          if (jsonRes.success) this.setState({ info: jsonRes.userList });
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
          profilo: infoObj.profileurl,
          username: infoObj.username,
          "indice Rt": infoObj.rt,
          "focolai supportati": infoObj.number
        };
      });
  };

  handleChange = e => {
    this.setState({ userSearchSI: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    alert(this.state.userSearchSI);
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
            placeholder="cerca contagiato"
          />
          <input
            className="button-small home-search-submit "
            type="submit"
            value="CERCA"
            style={!this.state.userSearchSI ? { display: "none" } : null}
          />
        </form>
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
