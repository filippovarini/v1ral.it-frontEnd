import React, { Component } from "react";
import errorHandler from "../../functions/errorHandler";

import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import UserProfile from "../UserProfile/UserProfile";

export class UserDashboard extends Component {
  state = {
    loading: true,
    user: null,
    shops: null
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    fetch("/page/dashboard/user")
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          this.setState({
            shops: jsonRes.shops,
            user: jsonRes.user,
            loading: false
          });
        } else {
          if (jsonRes.serverError) errorHandler.serverError(jsonRes);
          window.location = "/";
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    const body = this.state.user ? (
      <UserProfile user={this.state.user} shops={this.state.shops} />
    ) : null;
    return this.state.loading ? (
      <div>
        <Header />
        <div className="page-wrapper">
          <Loading class="page-loading" />
        </div>
      </div>
    ) : (
      body
    );
  }
}

export default UserDashboard;
