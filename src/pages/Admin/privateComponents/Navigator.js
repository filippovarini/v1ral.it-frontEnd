import React, { Component } from "react";
import "./privateComponents.css";

/** Admin navigator
 * @param updateNav()
 * @param navState
 */
export class Navigator extends Component {
  render() {
    return (
      <div id="admin-nav">
        <div
          className={`admin-nav-item flex-line ${
            this.props.navState === 0 ? "clicked" : ""
          }`}
          onClick={() => this.props.updateNav(0)}
        >
          <i className="fas fa-chart-line"></i>
          <p className="admin-nav-item-text">Dashboard</p>
        </div>
        <div
          className={`admin-nav-item flex-line ${
            this.props.navState === 1 ? "clicked" : ""
          }`}
          onClick={() => this.props.updateNav(1)}
        >
          <i className="fas fa-hand-holding-usd"></i>
          <p className="admin-nav-item-text">Prodotti venduti</p>
        </div>
        <div
          className={`admin-nav-item flex-line ${
            this.props.navState === 2 ? "clicked" : ""
          }`}
          onClick={() => this.props.updateNav(2)}
        >
          <i className="fas fa-store-alt"></i>
          <p className="admin-nav-item-text">Shops</p>
        </div>
        <div
          className={`admin-nav-item flex-line ${
            this.props.navState === 3 ? "clicked" : ""
          }`}
          onClick={() => this.props.updateNav(3)}
        >
          <i className="fas fa-bug"></i>
          <p className="admin-nav-item-text">Bugs</p>
        </div>
        {this.props.superAdmin ? (
          <div
            className={`admin-nav-item flex-line ${
              this.props.navState === 3 ? "clicked" : ""
            }`}
            onClick={() => this.props.updateNav(3)}
          >
            <i className="fas fa-user-shield"></i>
            <p className="admin-nav-item-text">Admins</p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Navigator;
