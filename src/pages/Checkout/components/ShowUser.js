import React, { Component } from "react";

/** Show in checkout page user info
 * @param user Object with all infos
 */
export class ShowUser extends Component {
  render() {
    return (
      <div id="show-user-container">
        <img src={this.props.user.userProfile} id="show-user-image" />
        <p id="show-user-username">{this.props.user.name}</p>
      </div>
    );
  }
}

export default ShowUser;
