import React, { Component } from "react";
import "./priviledges.css";
import PrivBox from "./PrivBox";

/** Box where to show priviledges set (being that the v1ral pass or the stock)
 * @param header
 * @param addPriviledge
 * @param priviledges [{ title, description}]
 */
export class Priviledges extends Component {
  render() {
    const priviledges = this.props.priviledges || [];
    return (
      <div className="body-box dark-box-container">
        <div className="flex-line" style={{ justifyContent: "space-between" }}>
          <p className="body-box-header dark">{this.props.header}</p>
          {this.props.addPriviledge ? (
            <p id="stats-redirect" onClick={this.props.addPriviledge}>
              Aggiungi privilegio <i className="fas fa-plus"></i>
            </p>
          ) : null}
        </div>
        <div className="flex-line dark-box-body">
          {priviledges.map((priv, i) => (
            <PrivBox priv={priv} key={i} />
          ))}
        </div>
      </div>
    );
  }
}

export default Priviledges;
