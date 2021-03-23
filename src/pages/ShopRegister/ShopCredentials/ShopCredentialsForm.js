import React, { Component } from "react";

import PlaceForm from "../../../components/PlaceForm/PlaceForm";

export class Form extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    return (
      <form
        id="input-container"
        className="shop-register-body"
        onSubmit={this.handleSubmit}
      >
        <div className="shopRegister-input-container">
          <label htmlFor="email">Email ufficiale</label>
          <input
            type="text"
            id="email"
            placeholder="email"
            onChange={this.props.handleChange}
          />
        </div>
        <PlaceForm handleChange={this.props.handleChange} />
        <div className="shopRegister-input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="psw"
            placeholder="password"
            onChange={this.props.handleChange}
          />
        </div>
        <p className="form-error">{this.props.error}</p>
        <input type="submit" className="hidden" />
      </form>
    );
  }
}

export default Form;
