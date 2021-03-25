import React, { Component } from "react";

import EditBio from "./EditBio";
import EditPlace from "./EditPlace";
import EditPassword from "./EditPassword";

/** Handles shop settings with a slidebar
 * @param hide
 * @param hidden
 */
export class UserSettings extends Component {
  state = {
    bioEditing: false,
    placeEditing: false,
    credentialsEditing: false
  };

  toggleEditing = value => {
    this.setState({
      [value]: !this.state[value]
    });
  };

  render() {
    return (
      <div
        className="settings-slidebar slidebar"
        onMouseLeave={this.props.hide}
        style={this.props.hidden ? { display: "none" } : null}
      >
        <p
          className="settings-option"
          onClick={() => this.toggleEditing("bioEditing")}
        >
          Modifica bio
        </p>
        <p
          className="settings-option"
          onClick={() => this.toggleEditing("placeEditing")}
        >
          Modifica luogo spedizione
        </p>
        <p
          className="settings-option"
          onClick={() => this.toggleEditing("credentialsEditing")}
        >
          Modifica password
        </p>
        <EditBio
          hidden={!this.state.bioEditing}
          hide={() => this.toggleEditing("bioEditing")}
          isUser={true}
        />
        <EditPlace
          hidden={!this.state.placeEditing}
          hide={() => this.toggleEditing("placeEditing")}
          isUser={true}
        />
        <EditPassword
          hidden={!this.state.credentialsEditing}
          hide={() => this.toggleEditing("credentialsEditing")}
          isUser={true}
        />
      </div>
    );
  }
}

export default UserSettings;
