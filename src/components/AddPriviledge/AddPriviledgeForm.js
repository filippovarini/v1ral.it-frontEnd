import React, { Component } from "react";

/** AddInfo component
 * Form to add a service
 * @param handleSubmit function to fire on form submit
 * @param toggleIcons function to toggle icons pop up
 * @param handleChange
 * @param handleImageChange(url)
 * @param url of the image submitted
 */
export class ServiceForm extends Component {
  render() {
    const imageSubmitted = (
      <div
        className="service-icon"
        style={{ backgroundImage: `url(${this.props.url})` }}
      >
        <i
          id="hide-service-icon"
          className="fas fa-times hide-cross"
          onClick={() => {
            this.props.handleImageChange(null);
          }}
        ></i>
        {/* <img src={this.props.url} alt="Icona servizio offerto" /> */}
      </div>
    );

    const imageSubmitting = (
      <p id="icon-input-label" onClick={this.props.toggleIcons}>
        <i className="fas fa-camera"></i>
      </p>
    );

    const serviceIcon = this.props.url ? imageSubmitted : imageSubmitting;

    return (
      <form
        id="addService-form"
        className="addInfo-form"
        onSubmit={this.props.handleSubmit}
      >
        <div className="flex-line addService-form-line">
          {serviceIcon}
          <input
            id="title"
            type="text"
            autoComplete="off"
            placeholder="nome servizio"
            style={{ width: "100%" }}
            onChange={this.props.handleChange}
          />
        </div>
        <div
          id="viral-service-checkbox"
          className="addService-form-line flex-line"
        >
          <input
            id="type"
            type="checkbox"
            className="check-input"
            onChange={this.props.handleChange}
          />
          <label className="check-label" htmlFor="type">
            privilegio solo per utenti virali
          </label>
        </div>
      </form>
    );
  }
}

export default ServiceForm;