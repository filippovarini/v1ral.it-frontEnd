import React, { Component } from "react";

/** Input for credentials (email, psw)
 * @param handleChange
 * @param email
 * @param psw?
 * @param newPsw? oldPsw?
 * @param readOnly? whether the form should be only for readonly
 * @param editPsw? whether to show the big edit psw or not
 */
export class CredentialsForm extends Component {
  render() {
    return (
      <form id="credentials-form">
        <div className="form-input-container">
          <input
            type="text"
            id="email"
            className="full-width"
            placeholder="email"
            value={this.props.email}
            autoComplete="off"
            onChange={this.props.handleChange}
            disabled={this.props.readOnly}
          />
        </div>
        <div className="form-input-container">
          <input
            type="password"
            id={this.props.editPsw ? "oldPsw" : "psw"}
            placeholder={
              this.props.readOnly
                ? "password nascosta"
                : this.props.editPsw
                ? "vecchia password"
                : "password"
            }
            className="full-width"
            value={this.props.oldPsw || this.props.psw}
            autoComplete="off"
            onChange={this.props.handleChange}
            disabled={this.props.readOnly}
          />
        </div>
        {this.props.editPsw && !this.props.readOnly ? (
          <div className="form-input-container">
            <input
              type="password"
              id="newPsw"
              className="full-width"
              placeholder="nuova password"
              value={this.props.newPsw}
              autoComplete="off"
              onChange={this.props.handleChange}
              disabled={this.props.readOnly}
            />
          </div>
        ) : null}
      </form>
    );
  }
}

export default CredentialsForm;
