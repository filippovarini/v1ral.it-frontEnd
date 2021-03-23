import React, { Component } from "react";

export class ServiceForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    return (
      <form
        id="service-form"
        className="shop-register-body flex-col"
        onSubmit={this.handleSubmit}
      >
        <div className="shopRegister-input-container">
          <label htmlFor="email">Numero massimo contagiati</label>
          <input
            type="number"
            id="maxPremiums"
            value={this.props.maxPremiums || ""}
            placeholder="max contagiati"
            onChange={this.props.handleChange}
          />
        </div>
        <div className="shopRegister-input-container">
          <label htmlFor="password">Prezzo di Partenza</label>
          <input
            type="number"
            id="initialPrice"
            placeholder="prezzo"
            value={this.props.initialPrice || ""}
            onChange={this.props.handleChange}
          />
        </div>
        <p className="form-error">{this.props.error}</p>
        <input type="submit" className="hidden" />
      </form>
    );
  }
}

export default ServiceForm;
