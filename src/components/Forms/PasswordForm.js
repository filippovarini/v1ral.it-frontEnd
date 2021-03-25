import React, { Component } from "react";

/** Input for credentials (email, psw)
 * @param handleChange
 * @param oldPsw
 * @param newPsw
 */
export class PasswordForm extends Component {
  render() {
    return (
      <form id="credentials-form">
        <div className="form-input-container">
          <input
            type="password"
            id="oldPsw"
            placeholder="vecchia password"
            className="full-width"
            value={this.props.oldPsw}
            autoComplete="off"
            onChange={this.props.handleChange}
          />
        </div>
        <div className="form-input-container">
          <input
            type="password"
            id="newPsw"
            className="full-width"
            placeholder="nuova password"
            value={this.props.newPsw}
            autoComplete="off"
            onChange={this.props.handleChange}
          />
        </div>
      </form>
    );
  }
}

export default PasswordForm;
