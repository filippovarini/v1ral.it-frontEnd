import React, { Component } from "react";
import "./shopRegisterComponents.css";

export class Indexer extends Component {
  render() {
    return (
      <div id="indexer-container">
        <div
          className="indexer-nav"
          style={this.props.index === 0 ? { background: "black" } : null}
        ></div>
        <div
          className="indexer-nav"
          style={this.props.index === 1 ? { background: "black" } : null}
        ></div>
        <div
          className="indexer-nav"
          style={this.props.index === 2 ? { background: "black" } : null}
        ></div>
      </div>
    );
  }
}

export default Indexer;
