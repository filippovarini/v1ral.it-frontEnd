import React, { Component } from "react";
import "./settings.css";

import postImage from "../../functions/postImage";
import errorHandler from "../../functions/errorHandler";
import it from "../../locales/it.json";

import Loading from "../Loading/Loading";
import EditBio from "./Editors/EditBio";
import EditPlace from "./Editors/EditPlace";
import EditPassword from "./Editors/EditPassword";
import AddPasses from "./Editors/AddPasses";
import AddService from "./Editors/AddPriviledgeWrapper";

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
    addPassesEditing: false,
    addPriviledgeEditing: false,
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
    const shopImageSetting = (
      <form>
        <label className="settings-option" htmlFor="backgroundurl">
          {it.settings_background}
        </label>
        <input
          id="backgroundurl"
          type="file"
          onChange={this.handleImageChange}
          className="hidden"
          accept="image/*"
        />
        <label className="settings-option" htmlFor="logourl">
          {it.settings_logo}
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

    return this.state.loading ? (
      <div className="settings-slidebar box">
        <Loading />
      </div>
    ) : (
      <div
        className="settings-slidebar box"
        onMouseLeave={this.props.hide}
        style={this.props.hidden ? { display: "none" } : null}
      >
        <p
          className="settings-option"
          onClick={() => this.toggleEditing("bioEditing")}
        >
          {it.settings_bio}
        </p>

        <p
          className="settings-option"
          onClick={() => this.toggleEditing("placeEditing")}
        >
          {it.settings_shipment}
        </p>
        <p
          className="settings-option"
          onClick={() => this.toggleEditing("credentialsEditing")}
        >
          {it.settings_password}
        </p>
        {this.props.isUser ? null : (
          <div>
            {shopImageSetting}
            <p
              className="settings-option"
              onClick={() => this.toggleEditing("addPriviledgeEditing")}
            >
              {it.settings_add_priv}
            </p>
            <p
              className="settings-option"
              onClick={() => this.toggleEditing("addPassesEditing")}
            >
              {it.settings_add_passes}
            </p>
            <p
              className="settings-option settings-footer"
              onClick={this.props.handleDashboardClick}
            >
              {it.settings_connect_dashboard}
            </p>
          </div>
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
        <AddPasses
          hidden={!this.state.addPassesEditing}
          hide={() => this.toggleEditing("addPassesEditing")}
        />
        <AddService
          hidden={!this.state.addPriviledgeEditing}
          hide={() => this.toggleEditing("addPriviledgeEditing")}
        />
      </div>
    );
  }
}

export default UserSettings;
