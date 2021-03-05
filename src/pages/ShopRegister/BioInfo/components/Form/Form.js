import React, { Component } from "react";
import "./form.css";

export class Form extends Component {
  render() {
    return (
      <div id="input-container">
        <div className="bioInfo-input-container">
          <label htmlFor="name">Nome impresa</label>
          <input
            type="text"
            id="name"
            placeholder="nome"
            onChange={this.handleChange}
          />
        </div>
        <div className="bioInfo-input-container">
          <label htmlFor="email">Email ufficiale</label>
          <input
            type="text"
            id="emali"
            placeholder="email"
            onChange={this.handleChange}
          />
        </div>
        <div className="bioInfo-input-container">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            placeholder="password"
            onChange={this.handleChange}
          />
        </div>
        <div className="bioInfo-input-container">
          <label htmlFor="bio">Raccontatevi</label>
          <textarea
            id="bio"
            placeholder="Raccontaci la vostra storia, come rendete 
        l'italia un posto migliore e come il virus vi ha colpito"
          ></textarea>
        </div>
      </div>
    );
  }
}

export default Form;
