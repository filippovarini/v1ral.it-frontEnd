import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import errorHandler from "../../functions/errorHandler";
import "./challenger.css";

import it from "../../locales/it.json";

import Loading from "../Loading/Loading";

/** PopUp used for the user to insert
 * @param hidden show / hide
 * @param hide function to hide the popup
 * @param successRedirection where to redirect upon successful challenger insert
 * @param alreadyAccountRedirection where to redirect if user already logged
 */
export class Challenged extends Component {
  state = {
    challenger: null,
    loading: false,
    error: null
  };

  handleChange = e => {
    this.setState({
      challenger: e.target.value,
      error: null
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    fetch("/user/challenger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ challenger: this.state.challenger })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          this.props.hide();
          this.props.history.push(this.props.successRedirection);
        } else {
          this.setState({
            loading: false,
            error: "username sfidante non valido"
          });
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    const body = (
      <div
        className="popUp-background"
        style={this.props.hidden ? { display: "none" } : null}
      >
        <div id="challenged-container" className="popUp">
          <i className="fas fa-times hide-cross" onClick={this.props.hide}></i>
          <p id="challenged-title">{it.insert_challenger_header}</p>
          <p id="challenged-text">{it.insert_challenger_text}</p>
          <form onSubmit={this.handleSubmit}>
            <input
              id="challengerInput"
              type="text"
              className="textInput"
              onChange={this.handleChange}
              autoComplete="off"
              placeholder="username"
            />
            <p id="challenged-error" className="form-error">
              {this.state.error}
            </p>
            <Link
              id="already-account"
              to={this.props.alreadyAccountRedirection}
            >
              {it.insert_challenger_already_account}
            </Link>
            <input type="submit" style={{ display: "none" }} />
          </form>
        </div>
      </div>
    );

    const loading = (
      <div
        className="popUp-background"
        style={this.props.hidden ? { display: "none" } : null}
      >
        <div id="challenged-container" className="popUp">
          <i className="fas fa-times hide-cross" onClick={this.props.hide}></i>
          <Loading />
        </div>
      </div>
    );
    return this.state.loading ? loading : body;
  }
}

export default withRouter(Challenged);
