import React, { Component } from "react";

import it from "../../../../locales/it.json";
import categories from "../../../../locales/categories";

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
          <label htmlFor="name">{it.shop_name}</label>
          <input
            type="text"
            id="name"
            placeholder="nome"
            autoComplete="off"
            value={this.props.name || ""}
            onChange={this.props.handleChange}
          />
        </div>
        <div className="shopRegister-input-container">
          <label htmlFor="name">{it.shop_category}</label>
          <select
            id="category"
            onChange={this.props.handleChange}
            value={this.props.category || ""}
          >
            <option value="" disabled selected hidden>
              seleziona
            </option>
            {categories.map((category, i) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="shopRegister-input-container">
          <label htmlFor="bio">Raccontatevi</label>
          <textarea
            rows={5}
            onChange={this.props.handleChange}
            value={this.props.bio || ""}
            id="bio"
            placeholder="Raccontaci la vostra storia, come rendete 
        l'italia un posto migliore e come il virus vi ha colpito"
          ></textarea>
        </div>
        <p className="form-error">{this.props.error}</p>
        <input type="submit" className="hidden" />
      </form>
    );
  }
}

export default Form;
