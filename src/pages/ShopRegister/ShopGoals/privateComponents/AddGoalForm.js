import React, { Component } from "react";

/** AddInfo component
 * Form to add a goal
 * @param handleSubmit function to fire on form submit
 * @param handleChange
 */

export class GoalForm extends Component {
  render() {
    return (
      <form
        id="addGoal-form"
        className="addInfo-form flex-line"
        onSubmit={this.props.handleSubmit}
      >
        <input
          id="name"
          type="text"
          className="long-width"
          placeholder="nome obbiettivo"
          autoComplete="off"
          onChange={this.props.handleChange}
        />
        <select
          id="amount"
          className="short-width"
          onChange={this.props.handleChange}
        >
          <option disabled={true}>prezzo</option>
          <option value={100}>100</option>
          <option value={500}>500</option>
          <option value={1000}>1k</option>
          <option value={2000}>2k</option>
          <option value={5000}>5k</option>
          <option value={10000}>10k</option>
        </select>
        <input type="submit" className="hidden" />
      </form>
    );
  }
}

export default GoalForm;
