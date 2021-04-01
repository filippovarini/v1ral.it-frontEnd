import React, { Component } from "react";
import "./bugFound.css";

import errorHandler from "../../functions/errorHandler";

import it from "../../locales/it.json";

import Loading from "../Loading/Loading";

export class BugFound extends Component {
  state = { bug: "", inputShowing: false, success: false, loading: false };

  handleChange = e => this.setState({ bug: e.target.value });

  hideInput = e => {
    if (e.target.id === "bug-found-wrapper") {
      this.setState({ inputShowing: false });
    }
  };

  validField = () => {
    if (this.state.bug.length > 250) {
      alert("Inserisci massimo 250 caratteri");
      return false;
    }
    return true;
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.validField()) {
      this.setState({ loading: true });
      fetch("/admin/bug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ message: this.state.bug })
      })
        .then(res => res.json())
        .then(jsonRes => {
          this.setState({ success: true, inputShowing: false, loading: false });
          setTimeout(() => {
            this.setState({ success: false });
          }, 2000);
          if (jsonRes.serverError) errorHandler.serverError(jsonRes);
        })
        .catch(e => {
          console.log(e);
          errorHandler.clientError();
        });
    }
  };

  render() {
    const bugButton = (
      <div
        className="flex-line bug-found-container small"
        onClick={() => this.setState({ inputShowing: true })}
      >
        <i id="bug-found-icon" className="fas fa-virus"></i>
        <p id="bug-found-header">{it.bug_found_button_header}</p>
      </div>
    );

    const bugForm = (
      <div
        id="bug-found-wrapper"
        onClick={this.hideInput}
        className="popUp-background"
      >
        <form
          id="bug-found-form"
          className="bug-found-container big"
          onSubmit={this.handleSubmit}
        >
          <label id="bug-input-label">{it.bug_input_label}</label>
          <textarea
            id="bug-input"
            placeholder={it.bug_found_input_placeholder}
            onChange={this.handleChange}
          />
          {this.state.bug.length > 5 ? (
            <input
              id="bug-submit"
              type="submit"
              className="button small"
              value={it.bug_found_save}
              onClick={this.handleSubmit}
            />
          ) : null}
        </form>
      </div>
    );

    const bugSuccess = (
      <div
        id="bug-found-wrapper"
        className="popUp-background"
        onClick={this.hideInput}
      >
        <div className="bug-found-container big">
          <p id="bug-saved-header">{it.bug_saved_header}</p>
          <p id="bug-saved-text">{it.bug_saved_text}</p>
        </div>
      </div>
    );

    const bugLoading = (
      <div className="popUp-background">
        <div className="bug-found-container big">
          <Loading />
        </div>
      </div>
    );

    let body = this.state.inputShowing ? bugForm : bugButton;
    if (this.state.success) body = bugSuccess;
    if (this.state.loading) body = bugLoading;

    return body;
  }
}

export default BugFound;
