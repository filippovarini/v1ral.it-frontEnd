import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import errorHandler from "../../functions/errorHandler";

import Loading from "../../components/Loading/Loading";

export class AdminLogin extends Component {
  state = {
    username: null,
    psw: null,
    error: null,
    loading: true
  };

  /** Check that there  */
  componentDidMount = () => {
    window.scrollTo(0, 0);
    fetch("/admin/logged")
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.logged) this.props.history.push("/admin");
        else {
          if (jsonRes.serverError) errorHandler.serverError(jsonRes);
          else this.setState({ loading: false });
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  handleChange = e => {
    this.setState({
      error: null,
      [e.target.id]: e.target.value
    });
  };

  notEmpty = () => {
    const { username, psw } = this.state;
    if (!username || !psw) {
      this.setState({ error: "Inserisci tutti i campi" });
      return false;
    } else {
      return true;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.notEmpty()) {
      this.setState({ loading: true });
      fetch(`/admin/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          psw: this.state.psw
        })
      })
        .then(res => res.json())
        .then(jsonRes => {
          if (jsonRes.success) this.props.history.push("/admin");
          else if (jsonRes.serverError) errorHandler.serverError(jsonRes);
          else
            this.setState({
              loading: false,
              error: "Credenziali errate",
              username: null,
              psw: null
            });
        })
        .catch(e => {
          console.log(e);
          errorHandler.clientError();
        });
    }
  };

  render() {
    const body = (
      <form
        className="log-form box background"
        onSubmit={this.handleSubmit}
        style={{ height: "250px" }}
      >
        <p className="form-header">admin login</p>
        <input
          type="text"
          placeholder="username"
          autoComplete="off"
          id="username"
          className="log-form-input"
          onChange={this.handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="psw"
          autoComplete="off"
          className="log-form-input"
          onChange={this.handleChange}
        />
        <p className="form-error">{this.state.error}</p>
        <input type="submit" className="button small" />
      </form>
    );

    return this.state.loading ? (
      <div className="log-form box background">
        <Loading />
      </div>
    ) : (
      body
    );
  }
}

export default withRouter(AdminLogin);
