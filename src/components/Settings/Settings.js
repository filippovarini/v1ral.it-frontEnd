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
    const editBio = (
      <div
        className="settings-option flex-line"
        onClick={() => this.toggleEditing("bioEditing")}
      >
        <i className="fas fa-comment settings-option-icon"></i>
        <p className="settings-option-text">{it.settings_bio}</p>
        <EditBio
          hidden={!this.state.bioEditing}
          hide={() => this.toggleEditing("bioEditing")}
          isUser={this.props.isUser}
        />
      </div>
    );

    const editShipmentAddress = (
      <div
        className="settings-option flex-line"
        onClick={() => this.toggleEditing("placeEditing")}
      >
        <i className="fas fa-truck settings-option-icon"></i>
        <p className="settings-option-text">{it.settings_shipment}</p>
        <EditPlace
          hidden={!this.state.placeEditing}
          hide={() => this.toggleEditing("placeEditing")}
          isUser={this.props.isUser}
        />
      </div>
    );

    const editPassword = (
      <div
        className="settings-option flex-line"
        onClick={() => this.toggleEditing("credentialsEditing")}
      >
        <i className="fas fa-key settings-option-icon"></i>
        <p className="settings-option-text">{it.settings_password}</p>
        <EditPassword
          hidden={!this.state.credentialsEditing}
          hide={() => this.toggleEditing("credentialsEditing")}
          isUser={this.props.isUser}
        />
      </div>
    );

    const editShopImages = this.props.isUser ? null : (
      <form>
        <label
          className="settings-option settings-option-text"
          htmlFor="background"
        >
          <i className="fas fa-window-maximize settings-option-icon"></i>
          {it.settings_background}
        </label>
        <input
          id="background"
          type="file"
          onChange={this.handleImageChange}
          className="hidden"
          accept="image/*"
        />
        <label className="settings-option settings-option-text" htmlFor="logo">
          <i className="fas fa-user-circle settings-option-icon"></i>
          {it.settings_logo}
        </label>
        <input
          id="logo"
          type="file"
          onChange={this.handleImageChange}
          className="hidden"
          accept="image/*"
        />
      </form>
    );

    const addPriviledge = this.props.isUser ? null : (
      <div
        className="settings-option flex-line"
        onClick={() => this.toggleEditing("addPriviledgeEditing")}
      >
        <i className="fas fa-gem settings-option-icon"></i>
        <p className="settings-option-text">{it.settings_add_priv}</p>
        <AddService
          hidden={!this.state.addPriviledgeEditing}
          hide={() => this.toggleEditing("addPriviledgeEditing")}
        />
      </div>
    );

    const addPasses = this.props.isUser ? null : (
      <div
        className="settings-option flex-line"
        onClick={() => this.toggleEditing("addPassesEditing")}
      >
        <i className="fas fa-address-card settings-option-icon"></i>
        <p className="settings-option-text">{it.settings_add_passes}</p>
        <AddPasses
          hidden={!this.state.addPassesEditing}
          hide={() => this.toggleEditing("addPassesEditing")}
        />
      </div>
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
        {editBio}
        {editShipmentAddress}
        {editPassword}
        {editShopImages}
        {addPriviledge}
        {addPasses}
      </div>
    );
  }
}

export default UserSettings;
