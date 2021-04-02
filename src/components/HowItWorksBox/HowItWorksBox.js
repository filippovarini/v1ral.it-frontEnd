import React, { Component } from "react";
import "./how.css";

/** Renders box explaining how the service works
 * @param explanaiton {img, title, description, nav}
 */
export class HowItWorksBox extends Component {
  render() {
    return (
      <div className={`how-wrapper nav${this.props.explanaiton.nav}`}>
        <div className="how-container">
          <div className="how-header flex-line">
            <img
              className="how-image"
              src={this.props.explanaiton.img}
              alt="Come funziona il servizio"
            />
            <div className="how-title-container">
              <p className="how-nav">0{this.props.explanaiton.nav}</p>
              <p className="how-title">{this.props.explanaiton.title}</p>
            </div>
          </div>
          <p className="how-description">
            {this.props.explanaiton.description}
          </p>
        </div>
      </div>
    );
  }
}

export default HowItWorksBox;
