import React, { Component } from "react";
import "../bottomHalf.css";

export class Navigator extends Component {
  render() {
    return (
      <div id="bottomHalf-nav">
        <div
          className="bottomHalf-nav-container"
          onClick={() => {
            this.props.updateNav(0);
          }}
          style={
            this.props.active === 0 ? { textDecoration: "underline" } : null
          }
        >
          <p className="bottomHalf-nav-title">Statistiche</p>
        </div>
        <div
          className="bottomHalf-nav-container"
          onClick={() => {
            this.props.updateNav(1);
          }}
          style={
            this.props.active === 1 ? { textDecoration: "underline" } : null
          }
        >
          <p className="bottomHalf-nav-title">Imprese</p>
        </div>
        <div
          className="bottomHalf-nav-container"
          onClick={() => {
            this.props.updateNav(2);
          }}
          style={
            this.props.active === 2 ? { textDecoration: "underline" } : null
          }
        >
          <p className="bottomHalf-nav-title">Contagi</p>
        </div>
      </div>
    );
  }
}

export default Navigator;
