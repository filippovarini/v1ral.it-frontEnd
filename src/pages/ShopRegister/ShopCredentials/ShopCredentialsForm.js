import React, { Component } from "react";

import PlaceForm from "../../../components/Forms/PlaceForm";

import it from "../../../locales/it.json";

/** Form for shop credentials
 * @param toggleCheck1,2 function to toggle checkboxes
 */
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
          <label htmlFor="email">
            {it.shop_register_credentials_email_label}
          </label>
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
          header={it.shop_register_credentials_place}
          handleChange={this.props.handleChange}
          city={this.props.city}
          street={this.props.street}
          province={this.props.province}
          postcode={this.props.postcode}
        />
        <div className="shopRegister-input-container">
          <label htmlFor="password">
            {it.shop_register_credentials_choose_password}
          </label>
          <input
            type="password"
            autoComplete="off"
            id="psw"
            placeholder="password"
            value={this.props.psw || ""}
            onChange={this.props.handleChange}
          />
        </div>

        <div id="shop-credentials-checkboxes">
          <div className="shop-credentials-checkbox flex-line">
            <input
              type="checkbox"
              className="check-input"
              id="termsAndPrivacyCheck"
              onChange={this.props.toggleCheck1}
            />
            <label htmlFor="termsAndPrivacyCheck" className="check-label">
              {it.shop_register_terms_privacy}
            </label>
          </div>
          <div className="shop-credentials-checkbox flex-line">
            <input
              type="checkbox"
              className="check-input"
              id="termsAndPrivacyCheck"
              onChange={this.props.toggleCheck2}
            />
            <label htmlFor="termsAndPrivacyCheck" className="check-label">
              {it.shop_register_truthfullness}
            </label>
          </div>
        </div>
        <p className="form-error">{this.props.error}</p>
        <input type="submit" className="hidden" />
      </form>
    );
  }
}

export default Form;
