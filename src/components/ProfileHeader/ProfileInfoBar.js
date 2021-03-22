import React, { Component } from "react";

/** Returns the info bar with the numbers to be shown in profile header
 * @param info: Array of length 3 of objects of type {title, data}
 */
export class ProfileInfoBar extends Component {
  render() {
    return (
      <div id="profile-info-container">
        {this.props.info.map((info, i) => {
          return (
            <div key={i} className="profile-info">
              <p className="profile-info-number">{info.data}</p>
              <p className="profile-info-description">{info.title}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProfileInfoBar;
