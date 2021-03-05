import React, { Component } from "react";

import IconFields from "./IconFields";

/** Form to insert services
 * handleSubmit
 * toggleIcons
 * otherData
 * handleServiceChange
 * title
 * handleImageChange
 */
export class ServiceForm extends Component {
  render() {
    return (
      <form
        id="addService-form"
        className="flex-line"
        onSubmit={this.props.handleSubmit}
      >
        <IconFields
          showIcons={this.props.toggleIcons}
          url={this.props.otherData}
          removeIcon={() => {
            this.props.handleImageChange(null);
          }}
        />
        <input
          id="title-input"
          type="text"
          placeholder="nome servizio"
          onChange={this.props.handleServiceChange}
          value={this.props.title}
        />
      </form>
    );
  }
}

export default ServiceForm;
