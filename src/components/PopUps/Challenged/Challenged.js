/* PROPS:
challenged: true / false
 */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./challenged.css";

import colors from "../../../style/colors";

export class Challenged extends Component {
  state = {
    challenger: null
  };

  handleChange = e => {
    this.setState({
      challenger: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // do some calculations
    if (this.state.challenger) {
      this.props.history.push("/shops");
    }
  };

  render() {
    return (
      <div className={`popUp-background ${this.props.class}`}>
        <div
          id="challenged-container"
          className="box"
          style={{ background: colors.boxBackground }}
        >
          <div className="hide-cross" onClick={this.props.hide}>
            <i className="fas fa-times"></i>
          </div>
          <p id="challenged-title" className="input-header">
            Chi ti ha sfidato?
          </p>
          <form onSubmit={this.handleSubmit}>
            <input
              id="challengerInput"
              type="text"
              className="textInput"
              onChange={this.handleChange}
              autoComplete="off"
              placeholder="username"
            />
            <input type="submit" style={{ display: "none" }} />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Challenged);
