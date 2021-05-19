import React, { Component } from "react";
import errorHandler from "../../../functions/errorHandler";
import AddPriviledge from "../../Priviledge/AddPriviledge/AddPriviledge";
import Loading from "../../Loading/Loading";

/** Editor for adding a priviledge. Specifies the functions to fire
 * @param hide
 * @param hidden
 */
export class AddPriviledgeWrapper extends Component {
  state = {
    loading: false
  };

  handleSubmit = service => {
    this.setState({ loading: true });
    fetch("/shop/service", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ service })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) window.location = window.location.pathname;
        else {
          alert(jsonRes.message);
          if (jsonRes.serverError) errorHandler.serverError(jsonRes);
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    return (
      <div
        className="popUp-background"
        style={this.props.hidden ? { display: "none" } : null}
      >
        {this.state.loading ? (
          <div className="settings-wrapper tall">
            <Loading />
          </div>
        ) : (
          <div className="settings-wrapper">
            <AddPriviledge
              hide={this.props.hide}
              hidden={this.props.hidden}
              handleAdd={this.handleSubmit}
            />
          </div>
        )}
      </div>
    );
  }
}

export default AddPriviledgeWrapper;
