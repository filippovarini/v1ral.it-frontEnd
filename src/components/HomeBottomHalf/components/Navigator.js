import React, { Component } from "react";
import "../bottomHalf.css";

export class Navigator extends Component {
  state = {
    active: 1
  };
  render() {
    return (
      <div id="bottomHalf-nav">
        <div
          className="bottomHalf-nav-container"
          onClick={() => {
            this.setState({ active: 1 });
          }}
          style={
            this.state.active === 1 ? { textDecoration: "underline" } : null
          }
        >
          <p className="bottomHalf-nav-title">Statistiche</p>
        </div>
        <div
          className="bottomHalf-nav-container"
          onClick={() => {
            this.setState({ active: 2 });
          }}
          style={
            this.state.active === 2 ? { textDecoration: "underline" } : null
          }
        >
          <p className="bottomHalf-nav-title">Imprese</p>
        </div>
        <div
          className="bottomHalf-nav-container"
          onClick={() => {
            this.setState({ active: 3 });
          }}
          style={
            this.state.active === 3 ? { textDecoration: "underline" } : null
          }
        >
          <p className="bottomHalf-nav-title">Contagi</p>
        </div>
      </div>
    );
  }
}

export default Navigator;
