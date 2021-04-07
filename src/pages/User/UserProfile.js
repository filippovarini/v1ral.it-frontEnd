import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./userProfile.css";

import it from "../../locales/it.json";

import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import ShopBox from "../../components/ShopBox/ShopBox";
import UserProfileHeader from "../../components/ProfileHeaders/UserProfileHeader";
import UserProfileLogo from "../../components/UserProfileLogo/UserProfileLogo";

/**
 * @param user
 * @param dashboard
 * @param shops
 * @param loading
 */
export class UserProfile extends Component {
  numberToGetViral = () => {
    return (
      50 - (parseInt(this.props.user.number) + parseInt(this.props.user.rt))
    );
  };

  render() {
    const body = this.props.user ? (
      <div className="page-wrapper">
        <div id="userProfile-header-container" className="box">
          <div id="userProfile-logo">
            <UserProfileLogo url={this.props.user.profileurl} />
          </div>
          <div id="profile-header-container">
            <UserProfileHeader
              profile={{
                name: this.props.user.username,
                description: this.props.user.reason,
                city: this.props.user.city,
                province: this.props.user.province,
                type: this.props.user.type
              }}
              info={[
                { title: it.tokens, data: this.props.user.number },
                { title: it.rt_index, data: this.props.user.rt },
                { title: it.challenger, data: this.props.user.challenger }
              ]}
              numberToViral={this.numberToGetViral()}
              dashboard={this.props.dashboard}
            />
          </div>
        </div>
        <p id="userProfile-shops-header">Focolai supportati:</p>
        {this.props.shops.length === 0 ? (
          <div id="userProfile-empty-shops" className="communication-panel">
            <p className="communication-panel-header">
              Nessun focolaio supportato
            </p>
            <p className="communication-panel-text">
              {this.props.user.name} non ha ancora investito in un focolaio
            </p>
          </div>
        ) : (
          <div className="shopBoxes-container">
            {this.props.shops.map((shop, i) => (
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
          {this.props.loading ? <Loading class="page-loading" /> : body}
        </div>
      </div>
    );
  }
}

export default withRouter(UserProfile);
