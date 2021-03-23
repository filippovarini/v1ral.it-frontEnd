import React, { Component } from "react";

/** Returns a list of best selling stuff (services of goals)
 * @param bestSellings[{title, handleSubmit}]
 */
export class BestSelling extends Component {
  render() {
    return (
      <div>
        {this.props.bestSellings.map((info, i) => {
          return (
            <div key={i} className="bestSelling flex-line box-hover">
              <p className="bestSelling-title">{info}</p>
              <i className="fas fa-plus bestSelling-icon icon"></i>
            </div>
          );
        })}
      </div>
    );
  }
}

export default BestSelling;
