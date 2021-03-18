/* requesrt for 
shops: [{logo, name, category, goalsDone (correct format), cases}] */

import React, { Component } from "react";

import Table from "../../../components/Table/Table";
import Loading from "../../../components/Loading/Loading";
import shops from "../../../faqData/shopsList";

export class Shops extends Component {
  state = {
    loading: true
  };
  componentDidMount = () => {
    console.log("shops");
  };

  render() {
    return (
      <div id="shops-container" className={this.props.class}>
        {this.state.loading ? <Loading /> : <Table data={shops} />}
      </div>
    );
  }
}

export default Shops;
