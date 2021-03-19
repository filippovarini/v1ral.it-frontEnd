/* PROPS:
challenged: true / false
 */

import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import errorHandler from "../../errorHandler";
import "./challenger.css";

import HideCross from "../HideCross/HideCross";
import Loading from "../Loading/Loading";

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
        <div id="challenged-container" className="box">
          <HideCross hide={this.props.hide} />
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
            <p className="form-error">{this.state.error}</p>
            <Link to={this.props.alreadyAccountRedirection}>
              ho già un account
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
        <div id="challenged-container" className="box">
          <HideCross hide={this.props.hide} />
          <Loading />
        </div>
      </div>
    );
    return this.state.loading ? loading : body;
  }
}

export default withRouter(Challenged);
