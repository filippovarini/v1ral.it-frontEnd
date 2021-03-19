import React, { Component } from "react";

/** Box showing services
 * @param: goals: [{name, amount}]
 */
export class Goals extends Component {
  render() {
    return (
      <div className="statistics-box box quick-facts quick-facts-wide quick-facts-margin">
        <p className="facts-header">ripresa</p>
        <div className="facts-container">
          {this.props.goals.map((goal, i) => {
            return (
              <div className="fact fact-align fact-align-between" key={i}>
                <p className="fact-title-small">{goal.name}</p>
                <p className="fact-data-small">{goal.amount}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Goals;
