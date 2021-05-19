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
      <form className="input-container" onSubmit={this.handleSubmit}>
        <PlaceForm
          header={it.shop_register_credentials_place}
          handleChange={this.props.handleChange}
          city={this.props.city}
          street={this.props.street}
          province={this.props.province}
          postcode={this.props.postcode}
        />

        <div className="input-line input-box">
          <label htmlFor="email">
            {it.shop_register_credentials_owner_label}
          </label>
          <input
            type="text"
            id="owner_name"
            autoComplete="off"
            placeholder={it.shop_register_credentials_owner_name}
            value={this.props.owner_name || ""}
            onChange={this.props.handleChange}
          />
          <input
            type="text"
            autoComplete="off"
            id="owner_phone"
            placeholder={it.shop_register_credentials_owner_phone}
            value={this.props.owner_phone || ""}
            onChange={this.props.handleChange}
          />
        </div>

        <div className="input-line input-box">
          <label htmlFor="email">{it.shop_register_credentials_input}</label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            placeholder={it.shop_register_credentials_email_label}
            value={this.props.email || ""}
            onChange={this.props.handleChange}
          />
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
