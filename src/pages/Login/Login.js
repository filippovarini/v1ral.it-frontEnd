import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import errorHandler from "../../functions/errorHandler";

import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";

export class UserLogin extends Component {
  state = {
    login: null,
    error: null,
    psw: null,
    loading: true,
    type: "user"
  };

  componentDidMount = () => {
    fetch("/page/login")
      .then(res => res.json())
      .then(jsonRes => {
        if (!jsonRes.success) this.props.history.push("/");
        else this.setState({ loading: false });
      });
  };

  handleChange = e => {
    this.setState({
      error: null,
      [e.target.id]: e.target.value
    });
  };

  notEmpty = () => {
    const { login, psw } = this.state;
    if (!login || !psw) {
      this.setState({ error: "Inserisci tutti i campi" });
      return false;
    } else {
      return true;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const body =
      this.state.type === "user"
        ? { login: this.state.login, psw: this.state.psw }
        : { email: this.state.login, psw: this.state.psw };
    if (this.notEmpty()) this.login(body);
  };

  login = body => {
    this.setState({ loading: true });
    fetch(`/${this.state.type}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success)
          window.location = window.location.search
            ? window.location.search.split("=")[1]
            : "/";
        else if (jsonRes.serverError) errorHandler.serverError(jsonRes);
        else
          this.setState({
            loading: false,
            error: "Credenziali errate",
            login: null,
            psw: null
          });
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    const body = (
      <form
        className="log-form box box-background"
        onSubmit={this.handleSubmit}
      >
        <p className="form-header">login</p>
        <select id="type" onChange={this.handleChange}>
          <option value="user">contagiato</option>
          <option value="shop">focolaio</option>
        </select>
        <input
          type="text"
          placeholder={
            "email" + (this.state.type === "user" ? " o username" : "")
          }
          autoComplete="off"
          id="login"
          onChange={this.handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="psw"
          autoComplete="off"
          onChange={this.handleChange}
        />
        <p className="form-error">{this.state.error}</p>
        <input type="submit" className="button-small" />
      </form>
    );

    return (
      <div>
        <Header />
        <div className="page-wrapper">
          {this.state.loading ? (
            <div className="log-form box box-background">
              <Loading />
            </div>
          ) : (
            body
          )}
          <Link to="/recover" className="log-form-subtext log-form-link">
            Credenziali dimenticate?
          </Link>
          <p className="log-form-subtext">
            Sei nuovo?{" "}
            <Link to="/" className="log-form-link">
              partecipa alla challenge
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(UserLogin);
