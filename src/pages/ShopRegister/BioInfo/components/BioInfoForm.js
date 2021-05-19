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
        id="bioInfo-form"
        className="input-container"
        onSubmit={this.handleSubmit}
      >
        <div className="input-line">
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
        <div className="input-line">
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
        <div id="shopRegister-bio" className="input-line">
          <label htmlFor="bio">Raccontatevi</label>
          <textarea
            rows={5}
            onChange={this.props.handleChange}
            value={this.props.bio || ""}
            id="bio"
            placeholder="Raccontaci la vostra storia, come rendete 
        l'italia un posto migliore e come il virus vi ha colpito"
          ></textarea>
          <p id="bio-space-left">
            {this.props.bio ? this.props.bio.length : 0}/500
          </p>
        </div>
        <input type="submit" className="hidden" />
      </form>
    );
  }
}

export default Form;
