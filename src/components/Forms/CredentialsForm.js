import React, { Component } from "react";

/** Used for the user to insert its private credentials and names
 * @param header
 * @param handleChange
 */
export class CredentialsForm extends Component {
  render() {
    return (
      <form className="full-width" style={{ marginBottom: "0px" }}>
        <p className="form-header">{this.props.header}</p>
        <input
          type="text"
          className="form-input"
          placeholder="username"
          id="username"
          onChange={this.props.handleChange}
        />
        <input
          type="text"
          placeholder="email"
          className="form-input"
          id="email"
          onChange={this.props.handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="form-input"
          id="psw"
          onChange={this.props.handleChange}
        />
      </form>
    );
  }
}

export default CredentialsForm;
