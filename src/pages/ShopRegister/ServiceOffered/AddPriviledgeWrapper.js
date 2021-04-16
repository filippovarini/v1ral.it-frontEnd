import React, { Component } from "react";
import AddService from "../../../components/AddPriviledge/AddPriviledge";

/** Wrapps the form to add priviledge
 * @param hide
 * @param hidden
 * @param handleAdd
 */
export class AddPriviledgeWrapper extends Component {
  handleSubmit = service => {
    this.props.hide();
    this.props.handleAdd(service);
  };

  render() {
    return (
      <div
        className="popUp-background"
        style={this.props.hidden ? { display: "none" } : null}
      >
        <AddService hide={this.props.hide} handleAdd={this.handleSubmit} />
      </div>
    );
  }
}

export default AddPriviledgeWrapper;
