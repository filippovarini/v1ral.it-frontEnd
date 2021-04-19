import React, { Component } from "react";
import "./loading.css";

/** @param class type of color */
export class SmallLoading extends Component {
  render() {
    return (
      <div id="loading-container" className={`small ${this.props.class}`}>
        <div class="loadingio-spinner-eclipse-hbomlyl697i">
          <div class="ldio-351dmw22jn2">
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default SmallLoading;
