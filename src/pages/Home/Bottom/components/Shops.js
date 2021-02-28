/* PROPS
shops: [{logo, name, category, goalsDone (correct format), cases}] */

import React, { Component } from "react";

import Table from "../../../../components/Table/Table";
import shops from "../../../../faqData/Shops";

export class Shops extends Component {
  render() {
    return (
      <div id="shops-container" className={this.props.class}>
        <Table data={shops} />
      </div>
    );
  }
}

export default Shops;
