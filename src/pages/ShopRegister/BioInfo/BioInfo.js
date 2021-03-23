import React, { Component } from "react";
import "../shopRegister.css";

import Header from "../../../components/Header/Header";
import Images from "./components/Images/ImagesUploading";
import Form from "./components/BioInfoForm";
import Indexer from "../components/Indexer";

export class BioInfo extends Component {
  state = {
    name: null,
    category: null,
    bio: null,
    error: null
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value, error: null });
  };

  fieldsValid = () => {
    if (!this.state.name || !this.state.category || !this.state.bio) {
      this.setState({ error: "Completa tutti i campi" });
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    if (this.fieldsValid()) {
      this.props.history.push("/shop/register/credentials");
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div className="page-wrapper box shop-register-container">
          <Images />
          <Form
            handleChange={this.handleChange}
            error={this.state.error}
            handleSubmit={this.handleSubmit}
          />
          <p
            className="button shop-register-button"
            onClick={this.handleSubmit}
          >
            PROSEGUI
          </p>
          <Indexer index={0} />
        </div>
      </div>
    );
  }
}

export default BioInfo;
