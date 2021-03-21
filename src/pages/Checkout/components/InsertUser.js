import React, { Component } from "react";
import "./components.css";

import CardPreview from "../../../components/CardPreview/CardPreview";

/** Insert new user info
 * @param challenger
 * @param handleSubmit
 */
export class InsertUser extends Component {
  state = {
    username: null,
    email: null,
    // type: null,
    // challenger: null,
    city: null,
    provence: null,
    street: null,
    postcode: null,
    profileUrl: null,
    psw: null,
    reason: null,
    credentialError: null
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    return (
      <div id="insertUser-container">
        <p id="insertUser-header">Inserisci le informazioni di contagio</p>
        <CardPreview
          challenger={this.props.challenger}
          username={this.state.username}
        />
        <form
          id="credentials-form"
          className="log-form"
          style={{ marginBottom: "0px" }}
        >
          <p className="log-form-subtext">CREDENZIALI</p>
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="email"
            id="email"
            onChange={this.handleChange}
          />
          <input
            type="password"
            placeholder="password"
            id="psw"
            onChange={this.handleChange}
          />
          <p className="form-error">{this.state.credentialError}</p>
        </form>
        <form id="credentials-form" className="log-form">
          <p className="form-header">SPEDIZIONE</p>
          <input
            type="text"
            placeholder="città"
            id="city"
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="provincia"
            id="province"
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="via"
            id="street"
            onChange={this.handleChange}
          />
          <input
            type="number"
            placeholder="CAP"
            id="postcode"
            onChange={this.handleChange}
          />
          <p className="form-error">{this.state.credentialError}</p>
        </form>
        <p id="checkout-confirm" className="button">
          SALVA E PROCEDI
        </p>
      </div>
    );
  }
}

export default InsertUser;
