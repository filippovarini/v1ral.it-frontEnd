import React, { Component } from "react";
import { withRouter } from "react-router-dom";

export class Indexer extends Component {
  render() {
    return (
      <div id="indexer-container">
        <div
          className="indexer-nav"
          style={this.props.index === 0 ? { background: "black" } : null}
          onClick={() => this.props.history.push("/shop/register/bio")}
        ></div>
        <div
          className="indexer-nav"
          style={this.props.index === 1 ? { background: "black" } : null}
          onClick={() => this.props.history.push("/shop/register/credentials")}
        ></div>
        <div
          className="indexer-nav"
          style={this.props.index === 2 ? { background: "black" } : null}
          onClick={() => this.props.history.push("/shop/register/services")}
        ></div>
        <div
          className="indexer-nav"
          style={this.props.index === 3 ? { background: "black" } : null}
          onClick={() => this.props.history.push("/shop/register/goals")}
        ></div>
      </div>
    );
  }
}

export default withRouter(Indexer);
