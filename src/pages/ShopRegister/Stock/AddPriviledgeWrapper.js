import React, { Component } from "react";
import AddPriviledge from "../../../components/AddPriviledge/AddPriviledge";

/** Wrapps the form to add priviledge
 * @param hide
 * @param hidden
 * @param type
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
        <AddPriviledge
          type={this.props.type}
          hide={this.props.hide}
          handleAdd={this.handleSubmit}
        />
      </div>
    );
  }
}

export default AddPriviledgeWrapper;
