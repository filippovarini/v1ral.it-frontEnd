import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import errorHandler from "../../functions/errorHandler";
import "./userProfile.css";

import it from "../../locales/it.json";

import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import ShopBox from "../../components/ShopBox/ShopBox";
import UserProfileHeader from "../../components/ProfileHeaders/UserProfileHeader";
import UserProfileLogo from "../../components/UserProfileLogo/UserProfileLogo";

export class UserProfile extends Component {
  state = {
    loading: true,
    shops: null,
    user: null,
    dashboard: false
  };

  /** Get info from database and session or from props if it is a dashboard */
  componentDidMount = () => {
    window.scrollTo(0, 0);
    if (
      window.location.pathname === "/user/dashboard" &&
      this.props.user &&
      this.props.shops
    ) {
      // dashboard
      this.setState({
        loading: false,
        shops: this.props.shops,
        user: this.props.user,
        dashboard: true
      });
    } else {
      const id = this.props.match.params.username;
      fetch(`/page/userProfile/${id}`)
        .then(res => res.json())
        .then(jsonRes => {
          if (jsonRes.success) {
            this.setState({
              shops: jsonRes.shops,
              user: jsonRes.user,
              loading: false
            });
          } else if (jsonRes.invalidUsername) {
            alert(jsonRes.message);
            window.location = "/users";
          } else {
            errorHandler.serverError(jsonRes);
            this.setState({ loading: false });
          }
        })
        .catch(e => {
          console.log(e);
          errorHandler.clientError();
        });
    }
  };

  numberToGetViral = () => {
    return (
      50 - (parseInt(this.state.user.number) + parseInt(this.state.user.rt))
    );
  };

  render() {
    const body = this.state.user ? (
      <div className="page-wrapper">
        <div id="userProfile-header-container" className="box">
          <div id="userProfile-logo">
            <UserProfileLogo url={this.state.user.profileurl} />
          </div>
          <div id="profile-header-container">
            <UserProfileHeader
              profile={{
                name: this.state.user.username,
                description: this.state.user.reason,
                city: this.state.user.city,
                province: this.state.user.province,
                type: this.state.user.type
              }}
              info={[
                { title: it.tokens, data: this.state.user.number },
                { title: it.rt_index, data: this.state.user.rt },
                { title: it.challenger, data: this.state.user.challenger }
              ]}
              numberToViral={this.numberToGetViral()}
              dashboard={this.state.dashboard}
            />
          </div>
        </div>
        <p id="userProfile-shops-header">Focolai supportati:</p>
        {this.state.shops.length === 0 ? (
          <div id="userProfile-empty-shops" className="communication-panel">
            <p className="communication-panel-header">
              Nessun focolaio supportato
            </p>
            <p className="communication-panel-text">
              {this.state.user.name} non ha ancora investito in un focolaio
            </p>
          </div>
        ) : (
          <div className="shopBoxes-container">
            {this.state.shops.map((shop, i) => (
              <ShopBox key={i} shop={shop} />
            ))}
          </div>
        )}
      </div>
    ) : null;
    return (
      <div>
        <Header />
        <div className="page-wrapper">
          {this.state.loading ? <Loading class="page-loading" /> : body}
        </div>
      </div>
    );
  }
}

export default withRouter(UserProfile);
