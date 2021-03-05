import React, { Component } from "react";
import "../shopRegister.css";

import Header from "../../../components/Header/Header";
import Images from "./components/Images/ImagesUploading";
import Form from "./components/Form/Form";
import Indexer from "../components/Indexer";

// faq data
import faqTitles from "../../../faqData/faqHeaderTitles";

export class BioInfo extends Component {
  handleSubmit = () => {
    this.props.history.push("/shop/register/services");
  };

  render() {
    return (
      <div>
        <Header class="standard" titles={faqTitles} />
        <div className="page-wrapper box shop-register-container">
          <Images />
          <Form />
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
