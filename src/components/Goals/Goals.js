import React, { Component } from "react";

// functions
import amountToString from "../../functions/amountToString";

/** Box showing services
 * @param: goals: [{name, amount}]
 * @param adding Boolean for whether user is editing
 * @param handleAddClick Function to fire if clicked add
 */
export class Goals extends Component {
  render() {
    const adding = this.props.adding ? (
      <div className="button fact-align" onClick={this.props.handleAddClick}>
        <i className="fas fa-plus fact-align-image sg-add-icon fact-title-small"></i>
        <p className="sg-add-title fact-title-small">Aggiungi</p>
      </div>
    ) : null;

    return (
      <div className="statistics-box box quick-facts quick-facts-wide quick-facts-margin">
        <p className="facts-header">obbiettivi</p>
        <div className="facts-container">
          {this.props.goals
            ? this.props.goals.map((goal, i) => {
                return (
                  <div className="fact fact-align fact-align-between" key={i}>
                    <p className="fact-title-small">{goal.name}</p>
                    <p className="fact-data-small" style={{ minWidth: "40px" }}>
                      {amountToString(goal.amount)} €
                    </p>
                  </div>
                );
              })
            : null}
          {adding}
        </div>
      </div>
    );
  }
}

export default Goals;
