import React, { Component } from "react";

import errorHandler from "../../../functions/errorHandler";

import Table from "../../../components/Table/Table";
import Loading from "../../../components/Loading/Loading";

/** Renders a list of admins with ability to delete an admin
 * @param admins
 */
export class AdminList extends Component {
  state = { loading: false };

  removeAdmin = username => {
    this.setState({ loading: true });
    fetch("/admin/admins", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ admin: username })
    })
      .then(res => res.json())
      .then(jsonRes => {
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
    if (this.props.admins) {
      data = this.props.admins.map(admin => {
        return {
          username: admin.username,
          type: admin.type,
          rimuovi:
            admin.type === "super-user" ? null : (
              <i
                className="fas fa-times pointer"
                onClick={() => this.removeAdmin(admin.username)}
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
      <div id="admins-table-contaienr">
        <Table data={this.formatDataForTable(this.props.admins)} />
      </div>
    );
  }
}

export default AdminList;
