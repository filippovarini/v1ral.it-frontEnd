import React, { Component } from "react";

/** Renders next and prev buttons for shop register process
 * @param handleClickNext?
 * @param handleClickPrev?
 * @param nextLoading?
 * @param prevLoading?
 */
export class Buttons extends Component {
  render() {
    return (
      <div id="shop-register-buttons-container">
        <p className="form-error">{this.props.error}</p>
        <div id="shop-register-buttons" className="flex-line">
          <p
            id="prev-button"
            className="shop-register-button button"
            onClick={this.props.handleClickPrev}
            style={this.props.handleClickPrev ? null : { visibility: "hidden" }}
          >
            <i id="prev-icon" className="fas fa-long-arrow-alt-left"></i>
          </p>
          <p
            id="next-button"
            className="shop-register-button button"
            onClick={this.props.handleClickNext}
            style={this.props.handleClickNext ? null : { visibility: "hidden" }}
          >
            <i id="next-icon" className="fas fa-long-arrow-alt-right"></i>
          </p>
        </div>
      </div>
    );
  }
}

export default Buttons;
