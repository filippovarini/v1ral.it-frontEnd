/* PROPS:
challenged: true / false
 */

import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "./challenged.css";

import HideCross from "../../../../components/HideCross/HideCross";
import Loading from "../../../../components/Loading/Loading";

import errorHandler from "../../../Error/ErrorHandler";
import colors from "../../../../style/colors";

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
    fetch("user/challenger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ challenger: this.state.challenger })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) this.props.history.push("/shops");
        else {
          this.setState({
            loading: false,
            error: "username sfidante non valido"
          });
        }
      })
      .catch(e => {
        console.log(e);
        this.props.history.push("/error");
      });
  };

  render() {
    const body = (
      <div
        className="popUp-background"
        style={this.props.hidden ? { display: "none" } : null}
      >
        <div
          id="challenged-container"
          className="box"
          style={{ background: colors.boxBackground }}
        >
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
            <Link to="/shops">ho già un account</Link>
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
        <div
          id="challenged-container"
          className="box"
          style={{ background: colors.boxBackground }}
        >
          <HideCross hide={this.props.hide} />
          <Loading />
        </div>
      </div>
    );
    return this.state.loading ? loading : body;
  }
}

export default withRouter(Challenged);
