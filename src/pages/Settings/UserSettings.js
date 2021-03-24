import React, { Component } from "react";
import "./settings.css";

// functions
import errorHandler from "../../functions/errorHandler";
import postImage from "../../functions/postImage";

import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import PlaceForm from "../../components/Forms/PlaceForm";
import BioForm from "../../components/Forms/BioForm";
import CredentialsForm from "../../components/Forms/CredentialsForm";

/** Page where the user can change its info */
export class UserSettings extends Component {
  state = {
    loading: true,
    email: null,
    city: null,
    street: null,
    province: null,
    postcode: null,
    bio: null,
    oldPsw: null,
    newPsw: null,
    profileurl: null,
    pswEditing: false,
    placeEditing: false,
    bioEditing: false,
    multerOperating: false,
    imageEditing: false,
    error: null
  };

  componentDidMount = () => {
    fetch("/page/user/settings")
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          this.setState({
            user: jsonRes.user,
            email: jsonRes.user.email,
            city: jsonRes.user.city,
            province: jsonRes.user.province,
            street: jsonRes.user.street,
            postcode: jsonRes.user.postcode,
            profileurl: jsonRes.user.profileurl,
            bio: jsonRes.user.reason,
            loading: false
          });
        } else {
          if (jsonRes.serverError) errorHandler.serverError(jsonRes);
          window.location = "/";
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      error: null
    });
  };

  togglePlaceEdit = () => {
    this.setState({
      placeEditing: !this.state.placeEditing,
      error: null,
      city: this.state.user.city,
      province: this.state.user.province,
      street: this.state.user.street,
      postcode: this.state.user.postcode
    });
  };

  toggleBioEdit = () => {
    document.getElementById("bio").value = this.state.user.reason;
    this.setState({
      bioEditing: !this.state.bioEditing,
      bio: this.state.user.reason,
      error: null
    });
  };

  togglePswEditing = () => {
    this.setState({
      pswEditing: !this.state.pswEditing,
      error: null,
      oldPsw: null,
      newPsw: null
    });
    document.getElementById("credentials-form").reset();
  };

  /** Saves the new image to s3 getting back an url
   * Once real url got back, set it on InsertUser state
   */
  handleImageChange = async e => {
    this.setState({ imageEditing: true });
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function(event) {
        this.setState({
          profileurl: event.target.result
        });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
    // send request
    // post and save
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    this.setState({ multerOperating: true });
    const url = await postImage(formData);
    this.setState({ profileurl: url, multerOperating: false });
  };

  resetImageChanges = () => {
    this.setState({
      error: null,
      multerOperating: false,
      imageEditing: false,
      profileurl: this.state.user.profileurl
    });
  };

  /** Checks the user has inserted all credentials fields */
  credentialsValid = () => {
    if (this.state.pswEditing) {
      if (!this.state.email || !this.state.oldPsw || !this.state.newPsw) {
        this.setState({
          error:
            "Compila tutti i campi nelle credenziali o annulla le modifiche in quel campo"
        });
        return false;
      } else if (this.state.oldPsw.length < 8 || this.state.newPsw.length < 8) {
        this.setState({
          error: "Le password devono essere lunghe almeno 8 caratteri"
        });
        return false;
      }
    }

    return true;
  };

  /** Checks the user has inserted all credentials fields */
  placeValid = () => {
    if (
      !this.state.city ||
      !this.state.province ||
      !this.state.street ||
      !this.state.postcode
    ) {
      this.setState({
        error:
          "Compila tutti i campi nel luogo di spedizione" +
          " o annulla le modifiche in quel campo"
      });
      return false;
    }
    return true;
  };

  /** Filters the update object removing the ones that are the same as the
   * previous ones
   */
  filterUpdate = update => {
    const filteredUpdate = {};
    Object.keys(update).forEach(key => {
      if (update[key] !== this.state.user[key]) {
        filteredUpdate[key] = update[key];
      }
    });
    return filteredUpdate;
  };

  /** Checks what should be updated
   * Send request
   * Refresh page to update stuff
   */
  handleSubmit = () => {
    const update = {};
    const body = {};
    if (this.placeValid() && this.credentialsValid()) {
      if (this.state.bioEditing) update.reason = this.state.bio;
      if (this.state.pswEditing) {
        update.email = this.state.email;
        body.oldPsw = this.state.oldPsw;
        body.newPsw = this.state.newPsw;
      }
      if (this.state.placeEditing) {
        update.city = this.state.city;
        update.province = this.state.province;
        update.street = this.state.street;
        update.postcode = this.state.postcode;
      }
      if (this.state.imageEditing) {
        update.profileurl = this.state.profileurl;
      }
      body.update = this.filterUpdate(update);
      if (Object.keys(body.update).length !== 0 || body.oldPsw) {
        // can send stuff
        this.setState({ loading: true });
        fetch("/user/updateInfo", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(body)
        })
          .then(res => res.json())
          .then(jsonRes => {
            console.log(jsonRes);
            if (jsonRes.success) {
              window.location = window.location.pathname;
            } else if (jsonRes.unauthorized) {
              this.setState({
                error: "Non sei autorizzato ad effettuare questa modifica"
              });
            } else if (jsonRes.pswInvalid) {
              this.setState({
                error: "La vecchia password fornita non è corretta"
              });
            } else {
              errorHandler.serverError(jsonRes);
            }
          })
          .catch(e => {
            console.log(e);
            errorHandler.clientError();
          });
      } else window.location = window.location.pathname;
    }
  };

  render() {
    const body = this.state.email ? (
      <div className="page-wrapper">
        <div className="settings-info-container">
          <div className="setting-info">
            <img
              id="setting-user-image"
              src={this.state.profileurl}
              alt="imagine profilo utente"
            />
            {!this.state.imageEditing ? (
              <form className="setting-edit">
                <label htmlFor="profileurl">modifica</label>
                <input
                  id="profileurl"
                  type="file"
                  onChange={this.handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </form>
            ) : (
              <p className="setting-edit" onClick={this.resetImageChanges}>
                annulla
              </p>
            )}
          </div>
          <p className="setting-name">{this.state.user.username}</p>
          <div className="setting-info">
            <BioForm
              bio={this.state.bio}
              readOnly={!this.state.bioEditing}
              handleChange={this.handleChange}
            />
            <p className="setting-edit" onClick={this.toggleBioEdit}>
              {this.state.bioEditing ? "annulla" : "modifica"}
            </p>
          </div>
          <div className="setting-info">
            <PlaceForm
              city={this.state.city}
              province={this.state.province}
              street={this.state.street}
              postcode={this.state.postcode}
              readOnly={!this.state.placeEditing}
              handleChange={this.handleChange}
            />
            <p className="setting-edit" onClick={this.togglePlaceEdit}>
              {this.state.placeEditing ? "annulla" : "modifica"}
            </p>
          </div>
          <div className="setting-info">
            <CredentialsForm
              email={this.state.email}
              oldPsw={this.state.oldPsw}
              newPsw={this.state.newPsw}
              editPsw={true}
              postcode={this.state.postcode}
              readOnly={!this.state.pswEditing}
              handleChange={this.handleChange}
            />
            <p className="setting-edit" onClick={this.togglePswEditing}>
              {this.state.pswEditing ? "annulla" : "modifica"}
            </p>
          </div>
          <p className="form-error setting-error">{this.state.error}</p>
          {this.state.multerOperating ? (
            <p className="button setting-confirm button-disabled">
              caricando l'immagine...
            </p>
          ) : (
            <p className="button setting-confirm" onClick={this.handleSubmit}>
              SALVA MODIFICHE
            </p>
          )}
        </div>
      </div>
    ) : null;
    return (
      <div>
        <Header />
        {this.state.loading ? (
          <div className="page-wrapper">
            <Loading />
          </div>
        ) : (
          body
        )}
      </div>
    );
  }
}

export default UserSettings;
