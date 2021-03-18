/* find
shops: [{logo, name, category, goalsDone (correct format), cases}] */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Table from "../../../components/Table/Table";
import cases from "../../../faqData/cases";
import Loading from "../../../components/Loading/Loading";

import errorHandler from "../../Error/ErrorHandler";

export class Shops extends Component {
  state = {
    loading: true,
    info: null
  };

  componentDidMount = () => {
    if (!this.state.info) {
      fetch("page/home/users")
        .then(res => res.json())
        .then(jsonRes => {
          if (jsonRes.success) this.setState({ info: jsonRes.userList });
          else errorHandler(jsonRes);
          this.setState({ loading: false });
        })
        .catch(e => {
          console.log(e);
          this.props.history.push("/error");
        });
    }
  };

  render() {
    return (
      <div id="shops-container" className={this.props.class}>
        {!this.state.loading && this.state.info ? (
          <Table data={this.state.info} />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default withRouter(Shops);
