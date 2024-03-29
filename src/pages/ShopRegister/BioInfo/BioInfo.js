import React, { Component } from "react";
import { connect } from "react-redux";
import "../shopRegister.css";
import "./bioInfo.css";

import it from "../../../locales/it.json";

import postImage from "../../../functions/postImage";

import Form from "./components/BioInfoForm";
import ShopImages from "./components/ShopImagesInput/ShopImages";
import RegisterHeader from "../components/ShopRegisterHeader";
import ImageLoading from "../../../components/Loading/ImageLoading";
import Buttons from "../components/Buttons";

export class BioInfo extends Component {
  state = {
    name: null,
    category: null,
    bio: null,
    logo: null,
    background: null,
    backgroundMulterOperating: false,
    logoMulterOperating: false,
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
        logo: this.props.shopRegister.bio.logo,
        background: this.props.shopRegister.bio.background
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
    const stateId = e.target.id === "logoInput" ? "logo" : e.target.id;
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function(event) {
        this.setState({
          [stateId]: event.target.result,
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
      [stateId]: url,
      [`${e.target.id}MulterOperating`]: false
    });
  };

  multerOperating = () => {
    return (
      this.state.logoMulterOperating || this.state.backgroundMulterOperating
    );
  };

  fieldsValid = () => {
    if (!this.state.name || !this.state.category || !this.state.bio) {
      this.setState({ error: "Completa tutti i campi" });
      return false;
    }
    if (this.state.bio && this.state.bio.length > 500) {
      this.setState({
        error: "La bio deve essere lunga massimo 500 caratteri"
      });
      return false;
    }
    return true;
  };

  imagesValid = () => {
    if (!this.state.background || !this.state.logo) {
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
          logo: this.state.logo,
          background: this.state.background,
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
      <div className="page-wrapper">
        <RegisterHeader navState={0} />
        <div className="shop-register-body">
          <p className="shop-register-body-header">
            {it.shop_register_bio_header}
          </p>
          <div>
            <ShopImages
              logo={this.state.logo}
              background={this.state.background}
              resetUrl={this.resetImage}
              handleImageChange={this.handleImageChange}
              input={true}
            />
            <Form
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              name={this.state.name}
              category={this.state.category}
              bio={this.state.bio}
            />
          </div>
          {this.multerOperating() ? (
            <div className="shop-register-button-container">
              <ImageLoading />
            </div>
          ) : (
            <Buttons
              handleClickNext={this.handleSubmit}
              error={this.state.error}
            />
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
