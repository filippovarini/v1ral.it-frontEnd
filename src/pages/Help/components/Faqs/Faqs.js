import React, { Component } from "react";
import it from "../../../../locales/it.json";
import faqs from "../../../../assets/faqs";
import Faq from "./Faq";

export class Faqs extends Component {
  render() {
    return (
      <div className="box body-box">
        <p className="body-box-header">{it.faqs}</p>
        {faqs.map((faq, i) => (
          <Faq faq={faq} key={i} />
        ))}
      </div>
    );
  }
}

export default Faqs;
