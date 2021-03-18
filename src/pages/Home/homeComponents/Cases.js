/* find
shops: [{logo, name, category, goalsDone (correct format), cases}] */

import React, { Component } from "react";

import Table from "../../../components/Table/Table";
import cases from "../../../faqData/cases";
import Loading from "../../../components/Loading/Loading";

export class Shops extends Component {
  state = {
    loading: true
  };
  componentDidMount = () => {
    console.log("cases");
  };
  render() {
    return (
      <div id="shops-container" className={this.props.class}>
        {this.state.loading ? <Loading /> : <Table data={cases} />}
      </div>
    );
  }
}

export default Shops;
