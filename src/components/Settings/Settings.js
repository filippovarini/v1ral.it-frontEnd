import React, { Component } from "react";

import postImage from "../../functions/postImage";
import errorHandler from "../../functions/errorHandler";

import Loading from "../Loading/Loading";
import EditBio from "./EditBio";
import EditPlace from "./EditPlace";
import EditPassword from "./EditPassword";

/** Handles shop settings with a slidebar
 * @param hide
 * @param hidden
 * @param isUser
 * @param handleDashboardClick? function firing when a shop in the dashboard
 * wants to go to the stripe dashboard
 */
export class UserSettings extends Component {
  state = {
    bioEditing: false,
    placeEditing: false,
    credentialsEditing: false,
    loading: false
  };

  loaded = () => {
    this.setState({ loading: false });
  };

  toggleEditing = value => {
    this.setState({
      [value]: !this.state[value]
    });
  };

  /** Saves the new image to s3 getting back an url
   * Once real url got back, set it on InsertUser state
   * @todo Avoid code repetition (same functions as in insertUser)
   */
  handleImageChange = async e => {
    this.setState({ loading: true });
    // send request
    // post and save
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    this.setState({ multerOperating: true });
    const url = await postImage(formData);
    if (this.props.isUser)
      this.postUpdate("/user/updateInfo", { update: { profileurl: url } });
    else
      this.postUpdate("/shop/updateInfo", { update: { [e.target.id]: url } });
  };

  postUpdate = (url, body) => {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          this.loaded();
          window.location = window.location.pathname;
        } else if (jsonRes.unauthorized) {
          alert("Non sei autorizzato ad effettuare questa modifica");
          this.loaded();
        } else {
          errorHandler.serverError(jsonRes);
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    const userImageSetting = (
      <form>
        <label className="settings-option" htmlFor="profile">
          Modifica imagine profilo
        </label>
        <input
          id="profile"
          type="file"
          onChange={this.handleImageChange}
          className="hidden"
          accept="image/*"
        />
      </form>
    );

    const shopImageSetting = (
      <form>
        <label className="settings-option" htmlFor="backgroundurl">
          Modifica sfondo
        </label>
        <input
          id="backgroundurl"
          type="file"
          onChange={this.handleImageChange}
          className="hidden"
          accept="image/*"
        />
        <label className="settings-option" htmlFor="logourl">
          Modifica logo
        </label>
        <input
          id="logourl"
          type="file"
          onChange={this.handleImageChange}
          className="hidden"
          accept="image/*"
        />
      </form>
    );

    const imageSettings = this.props.isUser
      ? userImageSetting
      : shopImageSetting;

    return this.state.loading ? (
      <div className="settings-slidebar slidebar">
        <Loading />
      </div>
    ) : (
      <div
        className="settings-slidebar slidebar"
        onMouseLeave={this.props.hide}
        style={this.props.hidden ? { display: "none" } : null}
      >
        {imageSettings}
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
        {this.props.isUser ? null : (
          <p
            className="settings-option"
            style={{ fontWeight: "bold" }}
            onClick={this.props.handleDashboardClick}
          >
            Dashboard Pagamenti
          </p>
        )}

        <EditBio
          hidden={!this.state.bioEditing}
          hide={() => this.toggleEditing("bioEditing")}
          isUser={this.props.isUser}
        />
        <EditPlace
          hidden={!this.state.placeEditing}
          hide={() => this.toggleEditing("placeEditing")}
          isUser={this.props.isUser}
        />
        <EditPassword
          hidden={!this.state.credentialsEditing}
          hide={() => this.toggleEditing("credentialsEditing")}
          isUser={this.props.isUser}
        />
      </div>
    );
  }
}

export default UserSettings;
