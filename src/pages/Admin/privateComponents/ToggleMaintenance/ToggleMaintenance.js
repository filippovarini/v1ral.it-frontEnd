import React, { Component } from "react";
import "./toggleMaintenance.css";

import errorHandler from "../../../../functions/errorHandler";

/** Button to toggle maintenance
 * @param alreadyMaintenance
 */
export class ToggleMaintenance extends Component {
  state = {
    checked: false,
    loading: false
  };

  componentDidMount = () => {
    this.setState({ checked: this.props.alreadyMaintenance });
  };

  handleChange = e => {
    const confirmString = !this.state.checked
      ? "Sei proprio sicuro di voler mettere il sito in manutenzione?"
      : "Sei sicuro di voler togliere il sito dalla manutenzione?";
    // eslint-disable-next-line no-restricted-globals
    if (confirm(confirmString)) {
      this.setState({ loading: true });
      fetch("/admin/maintenance", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ value: this.state.checked ? "off" : "on" })
      })
        .then(res => res.json())
        .then(jsonRes => {
          if (jsonRes.success) window.location = window.location.pathname;
          else {
            if (jsonRes.serverError) errorHandler.serverError(jsonRes);
          }
        })
        .catch(e => {
          console.log(e);
          errorHandler.clientError();
        });
    }
  };

  render() {
    return (
      <div id="maintenance-wrapper" className="admin-nav-item">
        {this.state.loading ? (
          <p id="maintenance-header">loading...</p>
        ) : (
          <div>
            <p id="maintenance-header">Manutenzione:</p>
            <div className="flex-line">
              <p className="switch-value">off</p>
              <div id="switch-container">
                <label className="switch">
                  <input
                    checked={this.state.checked}
                    onChange={this.handleChange}
                    type="checkbox"
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <p className="switch-value">on</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ToggleMaintenance;
