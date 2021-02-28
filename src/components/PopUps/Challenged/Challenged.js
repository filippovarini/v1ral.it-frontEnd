/* PROPS:
challenged: true / false
 */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./challenged.css";

import colors from "../../../style/colors";

export class Challenged extends Component {
  state = {
    challengerVerified: false,
    challengerInput: null,
    newUsernameInput: null
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleChallengerInputSubmit = e => {
    e.preventDefault();
    // do some calculations
    setTimeout(() => {
      this.setState({ challengerVerified: true });
    }, 2000);
  };

  handleNewUsernameInputSubmit = e => {
    e.preventDefault();
    this.props.history.push("/shops");
  };

  render() {
    const firstForm = this.state.challengerVerified ? (
      <p className="challenged-input">{this.state.challengerInput}</p>
    ) : (
      <form onSubmit={this.handleChallengerInputSubmit}>
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
    );

    const secondForm = this.state.challengerVerified ? (
      <form onSubmit={this.handleNewUsernameInputSubmit}>
        <label htmlFor="username-input" className="input-header">
          Scegli un username
        </label>
        <input
          id="newUsernameInput"
          type="text"
          className="textInput challenged-input"
          onChange={this.handleChange}
          autoComplete="off"
        />
        <input
          id="username-submit"
          type="submit"
          className="button-small"
          value="CONTAGIATI"
        />
      </form>
    ) : null;

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
          {firstForm}
          {secondForm}
        </div>
      </div>
    );
  }
}

export default withRouter(Challenged);
