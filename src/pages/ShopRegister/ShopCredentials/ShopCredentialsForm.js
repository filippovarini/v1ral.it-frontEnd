import React, { Component } from "react";

import PlaceForm from "../../../components/Forms/PlaceForm";

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
            autoComplete="off"
            placeholder="email"
            value={this.props.email || ""}
            onChange={this.props.handleChange}
          />
        </div>
        <PlaceForm
          handleChange={this.props.handleChange}
          city={this.props.city}
          street={this.props.street}
          province={this.props.province}
          postcode={this.props.postcode}
        />
        <div className="shopRegister-input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="off"
            id="psw"
            placeholder="password"
            value={this.props.psw || ""}
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
