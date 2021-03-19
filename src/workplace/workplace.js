import React, { Component } from "react";
import { connect } from "react-redux";
import "./workplace.css";

export class workplace extends Component {
  shit = () => {
    this.props.dispatch({
      type: "SET-USER",
      user: { name: "Filippo", userProfile: "oirgnoerwgnowon" }
    });
  };
  render() {
    return (
      <div id="workplace">
        <p onClick={this.shit}>click me</p>
        <p>{this.props.user.name}</p>
        <p>{this.props.user.userProfile}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(workplace);
