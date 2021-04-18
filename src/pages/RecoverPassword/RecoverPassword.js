import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import errorHandler from "../../functions/errorHandler";
import emailValid from "../../functions/emailValid";

import it from "../../locales/it.json";

import Loading from "../../components/Loading/Loading";

export class RecoverPassword extends Component {
  state = {
    type: "user",
    email: null,
    error: null,
    loading: true,
    success: false
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    fetch("/page/login")
      .then(res => res.json())
      .then(jsonRes => {
        if (!jsonRes.success) this.props.history.push("/");
        else this.setState({ loading: false });
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

  validFields = () => {
    if (!this.state.email || !emailValid(this.state.email)) {
      this.setState({ error: "Inserisci un'email valida" });
      return false;
    }
    return true;
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.validFields()) {
      this.setState({ loading: true });
      fetch(`/users/resetPsw`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: this.state.email, type: this.state.type })
      })
        .then(res => res.json())
        .then(jsonRes => {
          if (jsonRes.success) {
            this.setState({ success: true, loading: false });
          } else {
            this.setState({
              loading: false,
              email: null,
              error: jsonRes.message
            });
            if (jsonRes.serverError) errorHandler.serverError(jsonRes);
          }
        })
        .catch(e => {
          console.log(e);
          errorHandler.clientError();
        });
    }
  };

  render() {
    const formBody = (
      <form
        className="log-form box box-background"
        onSubmit={this.handleSubmit}
      >
        <p className="form-header">{it.reset_password_title}</p>
        <select
          id="type"
          onChange={this.handleChange}
          className="log-form-input"
        >
          <option value="user">{it.user}</option>
          <option value="shop">{it.shop}</option>
        </select>
        <input
          type="text"
          className="log-form-input"
          placeholder="email"
          id="email"
          autoComplete="off"
          onChange={this.handleChange}
        />
        <p className="form-error">{this.state.error}</p>
        <input type="submit" className="button small" />
      </form>
    );

    const successBody = (
      <div className="communication-panel" onSubmit={this.handleSubmit}>
        <p className="communication-panel-header">
          {it.reset_password_success}
        </p>
        <p className="communication-panel-text">
          {it.reset_password_success_title}
        </p>
        <Link to="/login" className="button small communication-panel-button">
          login
        </Link>
      </div>
    );

    const body = this.state.success ? successBody : formBody;

    return (
      <div>
        {this.state.loading ? (
          <div className="log-form box box-background">
            <Loading />
          </div>
        ) : (
          body
        )}
      </div>
    );
  }
}

export default withRouter(RecoverPassword);
