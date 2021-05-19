import React, { Component } from "react";

/** AddInfo component
 * Form to add a service
 * @param handleSubmit function to fire on form submit
 * @param handleChange
 * @param error
 */
export class ServiceForm extends Component {
  render() {
    return (
      <div id="addPriv">
        <form
          id="addPriv-form"
          className="dark-box"
          onSubmit={this.props.handleSubmit}
        >
          <input
            id="title"
            className="dark-box-text"
            type="text"
            autoComplete="off"
            placeholder="Titolo Breve"
            style={{ width: "100%" }}
            onChange={this.props.handleChange}
          />
          <textarea
            id="description"
            className="dark-box-text"
            type="text"
            autoComplete="off"
            placeholder="Descrizione privilegio"
            style={{ width: "100%" }}
            onChange={this.props.handleChange}
          ></textarea>
        </form>
        <div id="addPriv-form-footer">
          <p id="addPriv-error" className="form-error">
            {this.props.error}
          </p>
          <p
            id="addInfo-submit"
            className="button small"
            onClick={this.props.handleSubmit}
          >
            aggiungi
          </p>
        </div>
      </div>
    );
  }
}

export default ServiceForm;
