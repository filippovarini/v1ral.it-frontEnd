import React, { Component } from "react";
import it from "../../locales/it.json";
import UserLogo from "../UserProfileLogo/UserProfileLogo";

/** Form to insert all info necessary for the shop owner to check the user
 * identity
 * @param url of the profile image
 * @param handleImageChange
 * @param handleChange
 * @param resetImage
 */
export class UserIdentityForm extends Component {
  render() {
    const imageInput = (
      <div className="image-input-container user-profile-img">
        <label htmlFor="profileInput" className="image-input-label">
          <i id="profileInputLabel" className="fas fa-camera profile"></i>
        </label>
        <input
          id="profileInput"
          type="file"
          onChange={this.props.handleImageChange}
          className="hidden"
          accept="image/*"
        />
      </div>
    );
    const imageSubmitted = (
      <div className="user-profile-img">
        <UserLogo url={this.props.url} />
        <i
          className="fas fa-times hide-cross"
          onClick={this.props.resetImage}
        ></i>
      </div>
    );

    const image = this.props.url ? imageSubmitted : imageInput;

    return (
      <div>
        {image}
        <p className="image-input-description">
          {it.insertUser_appropriate_image}
        </p>
        <input
          type="text"
          id="name"
          className="form-input"
          style={{ marginTop: "20px" }}
          placeholder="nome (come appare sul documento)"
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
}

export default UserIdentityForm;
