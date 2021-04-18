import React, { Component } from "react";
import "./faqs.css";

/** Render faq box
 * @param faq
 *
 */
export class Faq extends Component {
  state = {
    faqCompressed: true
  };
  render() {
    return (
      <div className="faq">
        <div
          className="faq-question-container flex-line"
          onClick={() =>
            this.setState({ faqCompressed: !this.state.faqCompressed })
          }
        >
          <p className="faq-question">{this.props.faq.question}</p>
          {this.state.faqCompressed ? (
            <i className="fas fa-plus faq-icon"></i>
          ) : (
            <i className="fas fa-minus faq-icon"></i>
          )}
        </div>
        {this.state.faqCompressed ? null : (
          <p className="faq-answer">{this.props.faq.answer}</p>
        )}
      </div>
    );
  }
}

export default Faq;
