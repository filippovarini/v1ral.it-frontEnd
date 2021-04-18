import React, { Component } from "react";
import helpImage from "../../images/chat-bot.png";
import it from "../../locales/it.json";

import PageDescription from "../../components/PageDescription/PageDescription";
import Contacts from "./components/Contacts";
import Faqs from "./components/Faqs/Faqs";

/** Page where we render client service information */
export class Help extends Component {
  render() {
    return (
      <div>
        <PageDescription
          header={it.help_page_description_header}
          text={it.help_page_description_text}
          image={helpImage}
        />
        <Contacts />
        <Faqs />
      </div>
    );
  }
}

export default Help;
