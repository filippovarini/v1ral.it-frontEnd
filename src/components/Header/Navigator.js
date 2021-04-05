import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import errorHandler from "../../functions/errorHandler";
import "./header.css";

export class Navigator extends Component {
  // redirects the user to the relative dashboard page
  redirect = username => {
    const path = username[0] === "@" ? "/user" : "/shop";
    this.props.history.push(path + "/dashboard");
  };

  handleLogout = () => {
    fetch("/logout", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(jsonRes => (window.location = "/"))
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    let titles = this.props.user.name
      ? [
          { name: "vision", handleClick: () => alert("vision") },
          { name: "logout", handleClick: this.handleLogout }
        ]
      : [
          { name: "vision", handleClick: () => alert("vision") },
          {
            name: "diventa virale",
            handleClick: () => alert("diventa virale")
          },
          {
            name: "login",
            handleClick: () => this.props.history.push("/login")
          }
        ];

    const navBody = (
      <div id="header-nav">
        {titles.map((title, i) => {
          return (
            <div
              key={i}
              className="header-nav-item"
              onClick={title.handleClick}
            >
              <p className="header-nav-title">{title.name}</p>
            </div>
          );
        })}
        {this.props.user.name ? (
          <div
            key={-1}
            className="header-nav-item"
            id="header-nav-image-contaienr"
            onClick={() => this.redirect(this.props.user.name)}
          >
            <img
              src={this.props.user.userProfile}
              alt="Imagine profilo dell'utente"
              className="header-nav-title header-nav-image"
            />
            {window.innerWidth <= 800 ? (
              <p id="profile-link" className="header-nav-title">
                profilo
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    );

    return navBody;
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(withRouter(Navigator));
