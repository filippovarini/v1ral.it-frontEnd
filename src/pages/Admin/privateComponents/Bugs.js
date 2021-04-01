import React, { Component } from "react";

import errorHandler from "../../../functions/errorHandler";

import Table from "../../../components/Table/Table";
import Loading from "../../../components/Loading/Loading";

/** Renders a list of admins with ability to delete an admin
 * @param bugs
 */
export class Bugs extends Component {
  state = { loading: false };

  checkBug = id => {
    this.setState({ loading: true });
    fetch("/admin/bug", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes);
        if (jsonRes.success) window.location = window.location.pathname;
        else {
          if (jsonRes.serverError) errorHandler.serverError(jsonRes);
          this.setState({ loading: false });
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  formatDataForTable = () => {
    let data = [];
    if (this.props.bugs) {
      data = this.props.bugs.map(bug => {
        return {
          data: bug.date,
          messagio: bug.message,
          rimuovi: (
            <i
              className="fas fa-check pointer"
              onClick={() => this.checkBug(bug.id)}
            ></i>
          )
        };
      });
    }
    return data;
  };

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <div className="admin-table-container">
        <Table data={this.formatDataForTable(this.props.bugs)} />
      </div>
    );
  }
}

export default Bugs;
