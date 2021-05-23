import React, { Component } from "react";
import "./insertUser.css";

import errorHandler from "../../functions/errorHandler";
import postImage from "../../functions/postImage";
import emailValid from "../../functions/emailValid";

import it from "../../locales/it.json";
import successImg from "../../images/success.png";

import UserIdentityForm from "../Forms/UserIdentityForm";
import PlaceForm from "../Forms/PlaceForm";
import CredentialsForm from "../Forms/CredentialsForm";
import ImageLoading from "../Loading/ImageLoading";
import Loading from "../Loading/Loading";

/** Insert new user info. Button here to handle newUser checkout. On submit,
 * save new user to state and show user logged
 * @param challenger
 * @param hidden
 * @param hide
 */
export class InsertUser extends Component {
  state = {
    name: null,
    username: null,
    email: null,
    city: null,
    province: null,
    street: null,
    postcode: null,
    psw: null,
    reason: null,
    error: null,
    profileUrl: null,
    bio: null,
    multerOperating: false,
    imageLoading: false,
    step: 1,
    usernames: [],
    loading: false,
    success: false
  };

  /** Get list of all usernames actively used so that we can tell the user if
   * the username she is inserting is available
   */
  componentDidMount = () => {
    fetch("/user/usernames")
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          this.setState({ usernames: jsonRes.usernames });
        } else if (jsonRes.serverError) errorHandler.serverError(jsonRes);
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
    if (
      e.target.id === "username" &&
      this.state.usernames.includes(e.target.value)
    ) {
      this.setState({ error: "Username già utilizzato" });
    }
  };

  resetImage = () => {
    this.setState({ profileUrl: null, multerOperating: false });
  };

  /** Saves the new image to s3 getting back an url
   * Once real url got back, set it on InsertUser state
   */
  handleImageChange = async e => {
    this.setState({ imageLoading: true });
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function(event) {
        this.setState({
          profileUrl: event.target.result,
          imageLoading: false,
          error: null
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
    this.setState({ profileUrl: url, multerOperating: false });
  };

  // Check that the user has inserted all required info for step 1
  validStep1 = () => {
    let valid = true;
    if (
      !this.state.username ||
      !this.state.email ||
      !this.state.psw ||
      !this.state.city ||
      !this.state.street ||
      !this.state.province ||
      !this.state.postcode
    ) {
      this.setState({ error: "Completa tutti i campi" });
      valid = false;
    }
    if (
      (valid && this.state.username.includes("@")) ||
      this.state.username.includes(" ")
    ) {
      this.setState({
        error:
          "L'username non può contenere caratteri speciali come spazio e '@'"
      });
      valid = false;
    }
    if (valid && this.state.psw.length < 8) {
      this.setState({
        error: "La password deve essere lunga almeno 8 caratteri"
      });
      valid = false;
    }
    if (valid && !emailValid(this.state.email)) {
      this.setState({
        error: "Inserisci un'email valida"
      });
      valid = false;
    }
    if (valid && this.state.usernames.includes(this.state.username)) {
      this.setState({
        error: "Username già utilizzato"
      });
      valid = false;
    }
    return valid;
  };

  // Check that the user has inserted all the required info for step 2
  validStep2 = () => {
    if (!this.state.profileUrl) {
      this.setState({ error: "Inserisci l'immagine profilo" });
      return false;
    } else if (!this.state.name) {
      this.setState({ error: "Inserisci il tuo nome" });
      return false;
    } else return true;
  };

  submitStep1 = () => {
    if (this.validStep1()) this.setState({ step: 2 });
  };

  /** Check all info are correct and save the new inserting user to the session
   *
   */
  submitStep2 = () => {
    if (this.validStep2()) {
      this.setState({ loading: true });
      const newUser = {
        username: this.state.username,
        name: this.state.name,
        email: this.state.email,
        type: "standard",
        challenger: this.props.challenger,
        city: this.state.city,
        province: this.state.province,
        street: this.state.street,
        postcode: this.state.postcode,
        profileUrl: this.state.profileUrl,
        psw: this.state.psw,
        reason: null
      };
      fetch("/user/newUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ newUser })
      })
        .then(res => res.json())
        .then(_ => {
          this.setState({ loading: false, success: true });
          setInterval(() => this.props.hide(), 1000);
        })
        .catch(e => {
          console.log(e);
          errorHandler.clientError();
        });
    }
  };

  render() {
    const step1 = (
      <div>
        <p id="insertUser-header">{it.insertUser_header1}</p>
        <p id="insertUser-text">{it.insertUser_text1}</p>
        <div className="form-container">
          <CredentialsForm
            handleChange={this.handleChange}
            header="credenziali"
          />
        </div>
        <div className="form-container">
          <PlaceForm
            handleChange={this.handleChange}
            header="Luogo di spedizione"
            city={this.state.city}
            province={this.state.province}
            street={this.state.street}
            postcode={this.state.postcode}
          />
        </div>
        <p
          className="button small insertUser-button"
          onClick={this.submitStep1}
        >
          {it.save}
        </p>
      </div>
    );

    const step2 = (
      <div>
        <p id="insertUser-header">{it.insertUser_header2}</p>
        <p id="insertUser-text">{it.insertUser_text2}</p>
        <div className="form-container">
          <UserIdentityForm
            url={this.state.profileUrl}
            handleChange={this.handleChange}
            handleImageChange={this.handleImageChange}
            resetImage={this.resetImage}
          />
        </div>
        {this.state.multerOperating ? (
          <div className="insertUser-button">
            <ImageLoading size="small" />
          </div>
        ) : (
          <p
            className="button small insertUser-button"
            onClick={this.submitStep2}
          >
            {it.insertUser_confirm2}
          </p>
        )}
      </div>
    );

    const success = (
      <div id="insertUser-success">
        <p id="insertUser-header">{it.success}</p>
        <img src={successImg} alt="successo" />
        <p id="insertUser-success-description">{it.insertUser_success_text}</p>
      </div>
    );

    let body = null;
    switch (this.state.step) {
      case 1:
        body = step1;
        break;
      case 2:
        body = step2;
        break;
      default:
        throw Error("State can only be 0 or 1");
    }

    if (this.state.loading) body = <Loading />;
    if (this.state.success) body = success;

    return (
      <div
        className="popUp-background"
        style={this.props.hidden ? { display: "none" } : null}
      >
        <div id="insertUser-container" className="box">
          {body}
          <p className="form-error">{this.state.error}</p>
        </div>
      </div>
    );
  }
}

export default InsertUser;
