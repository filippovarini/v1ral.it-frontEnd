import React, { Component } from "react";
import { connect } from "react-redux";
import "../shopRegister.css";

import it from "../../../locales/it.json";

import postImage from "../../../functions/postImage";

import Form from "./components/BioInfoForm";
import ShopImages from "./components/ShopImagesInput/ShopImages";
import RegisterHeader from "../ShopRegisterHeader";
import ImageLoading from "../../../components/Loading/ImageLoading";

export class BioInfo extends Component {
  state = {
    name: null,
    category: null,
    bio: null,
    logourl: null,
    backgroundurl: null,
    backgroundurlMulterOperating: false,
    logourlMulterOperating: false,
    error: null
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    if (this.props.user && this.props.user.name) window.location = "/";
    if (
      this.props.shopRegister &&
      this.props.shopRegister.bio &&
      this.props.shopRegister.bio.name
    ) {
      this.setState({
        name: this.props.shopRegister.bio.name,
        bio: this.props.shopRegister.bio.bio,
        category: this.props.shopRegister.bio.category,
        logourl: this.props.shopRegister.bio.logourl,
        backgroundurl: this.props.shopRegister.bio.backgroundurl
      });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value, error: null });
  };

  resetImage = id => {
    this.setState({ [id]: null, [`${id}MulterOperating`]: false });
  };

  /**
   * 1. Saves huge raw url to state
   * 2. Posts image to multer
   * 3. Saves new shorter url to state
   */
  handleImageChange = async e => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function(event) {
        this.setState({
          [e.target.id]: event.target.result,
          error: false
        });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
    // send request
    // post and save
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    this.setState({ [`${e.target.id}MulterOperating`]: true });
    const url = await postImage(formData);
    this.setState({
      [e.target.id]: url,
      [`${e.target.id}MulterOperating`]: false
    });
  };

  multerOperating = () => {
    return (
      this.state.logourlMulterOperating ||
      this.state.backgroundurlMulterOperating
    );
  };

  fieldsValid = () => {
    if (!this.state.name || !this.state.category || !this.state.bio) {
      this.setState({ error: "Completa tutti i campi" });
      return false;
    }
    if (this.state.bio && this.state.bio.length > 250) {
      this.setState({
        error: "La bio deve essere lunga massimo 250 caratteri"
      });
      return false;
    }
    return true;
  };

  imagesValid = () => {
    if (!this.state.backgroundurl || !this.state.logourl) {
      this.setState({ error: "Inserisci entrambe le immagini richieste" });
      return false;
    } else if (this.multerOperating()) {
      this.setState({ error: "Attendi il caricamento delle immagini" });
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    if (this.fieldsValid() && this.imagesValid()) {
      this.props.dispatch({
        type: "SET-BIO",
        bio: {
          logourl: this.state.logourl,
          backgroundurl: this.state.backgroundurl,
          name: this.state.name,
          category: this.state.category,
          bio: this.state.bio
        }
      });
      this.props.history.push("/shop/register/credentials");
    }
  };

  render() {
    return (
      <div>
        <RegisterHeader navState={0} />
        <div className="shop-register-body">
          <p className="register-warning">
            {it.shop_register_complete_profile}
          </p>
          <div id="bio-forms-container">
            <div id="bioInfo-background-container">
              <ShopImages
                logourl={this.state.logourl}
                backgroundurl={this.state.backgroundurl}
                resetUrl={this.resetImage}
                handleImageChange={this.handleImageChange}
                input={true}
              />
            </div>
            <Form
              handleChange={this.handleChange}
              error={this.state.error}
              handleSubmit={this.handleSubmit}
              name={this.state.name}
              category={this.state.category}
              bio={this.state.bio}
            />
          </div>
          {this.multerOperating() ? (
            <div className="shop-register-button">
              <ImageLoading />
            </div>
          ) : (
            <p
              className="button shop-register-button"
              onClick={this.handleSubmit}
            >
              PROSEGUI
            </p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    shopRegister: state.shopRegister,
    user: state.user
  };
};

export default connect(mapStateToProps)(BioInfo);
