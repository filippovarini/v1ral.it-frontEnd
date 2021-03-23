import React, { Component } from "react";

/** Form to insert services
 * handleSubmit
 * handleServiceChange
 * title
 * handleOtherDataChange
 */
export class GoalForm extends Component {
  render() {
    return (
      <form
        id="addInfo-form"
        className="flex-line"
        onSubmit={this.props.handleSubmit}
      >
        <input
          id="title-input"
          type="text"
          autoComplete="off"
          placeholder="nome obbiettivo"
          onChange={this.props.handleServiceChange}
          value={this.props.title}
        />
        <select onChange={this.props.handleOtherDataChange}>
          <option value="€100">€100</option>
          <option value="€500">€500</option>
          <option value="€1k">€1k</option>
          <option value="€5k">€5k</option>
        </select>
      </form>
    );
  }
}

export default GoalForm;
