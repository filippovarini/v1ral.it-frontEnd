import React, { Component } from "react";
import { connect } from "react-redux";
import "../shopRegister.css";

import postImage from "../../../functions/postImage";

import Header from "../../../components/Header/Header";
import Images from "./components/Images/ImagesUploading";
import Form from "./components/BioInfoForm";
import Indexer from "../components/Indexer";

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
    this.setState({ [id]: null });
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
        <Header />
        <div className="page-wrapper box shop-register-container">
          <Images
            logourl={this.state.logourl}
            backgroundurl={this.state.backgroundurl}
            resetUrl={this.resetImage}
            handleImageChange={this.handleImageChange}
          />
          <Form
            handleChange={this.handleChange}
            error={this.state.error}
            handleSubmit={this.handleSubmit}
            name={this.state.name}
            category={this.state.category}
            bio={this.state.bio}
          />

          {this.multerOperating() ? (
            <p className="button shop-register-button button-disabled">
              caricando le immagini...
            </p>
          ) : (
            <p
              className="button shop-register-button"
              onClick={this.handleSubmit}
            >
              PROSEGUI
            </p>
          )}
          <Indexer index={0} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    shopRegister: state.shopRegister
  };
};

export default connect(mapStateToProps)(BioInfo);
