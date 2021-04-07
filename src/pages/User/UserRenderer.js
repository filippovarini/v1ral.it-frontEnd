import React, { Component } from "react";
import errorHandler from "../../functions/errorHandler";

import UserProfile from "./UserProfile";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";

export class UserRenderer extends Component {
  state = {
    loading: true,
    user: null,
    shops: null,
    dashboard: false
  };

  /** Get info from database and session or from props if it is a dashboard */
  componentDidMount = () => {
    window.scrollTo(0, 0);
    const id = this.props.match.params.username;
    fetch(`/page/user/${id}`)
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes);
        if (jsonRes.success) {
          this.setState({
            shops: jsonRes.shops,
            user: jsonRes.user,
            loading: false,
            dashboard: jsonRes.dashboard
          });
        } else if (jsonRes.invalidUsername) {
          alert(jsonRes.message);
          window.location = "/";
        } else {
          errorHandler.serverError(jsonRes);
          this.setState({ loading: false });
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    const body = (
      <UserProfile
        user={this.state.user}
        shops={this.state.shops}
        dashboard={this.state.dashboard}
      />
    );
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

export default UserRenderer;
