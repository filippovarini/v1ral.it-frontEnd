import React, { Component } from "react";
import "./forms.css";

/** Form to edit the bio info
 * @param handleChange
 * @param bio
 * @param readOnly?
 */
export class BioForm extends Component {
  render() {
    return (
      <div>
        <textarea
          id="bio"
          className="form-input form-input-container"
          rows={5}
          placeholder="raccontaci di te"
          value={this.props.bio}
          disabled={this.props.readOnly}
          onChange={this.props.handleChange}
        ></textarea>
      </div>
    );
  }
}

export default BioForm;
