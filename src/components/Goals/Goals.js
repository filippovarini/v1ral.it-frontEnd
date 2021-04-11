import React, { Component } from "react";

import it from "../../locales/it.json";

// functions
import amountToString from "../../functions/amountToString";

/** Box showing services
 * @param goals: [{name, amount}]
 * @param adding? Boolean for whether user is editing
 * @param deleteGoal? function to delete goal
 * @param handleAddClick Function to fire if clicked add
 */
export class Goals extends Component {
  render() {
    const adding = this.props.adding ? (
      <div
        className="button small style3 fact-align small"
        onClick={this.props.handleAddClick}
      >
        <i className="fas fa-plus fact-align-image sg-add-icon fact-title-small"></i>
        <p className="sg-add-title fact-title-small">Aggiungi</p>
      </div>
    ) : null;

    return (
      <div className=" box quick-facts wide quick-facts-margin">
        <p className="facts-header">{it.shop_goals}</p>
        <div className="facts-container">
          {this.props.goals
            ? this.props.goals.map((goal, i) => {
                return (
                  <div className="fact fact-align fact-align-between" key={i}>
                    <p className="fact-title-small">{goal.name}</p>
                    <p className="fact-data-small" style={{ minWidth: "40px" }}>
                      {amountToString(goal.amount)} €
                    </p>
                    {this.props.adding ? (
                      <i
                        className="fas fa-times hide-cross righter"
                        onClick={() => this.props.deleteGoal(i)}
                      ></i>
                    ) : null}
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
