import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import errorHandler from "../../functions/errorHandler";
import "./userProfile.css";

import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import ShopBox from "../../components/ShopBox/ShopBox";
import UserProfileHeader from "../../components/ProfileHeaders/UserProfileHeader";

export class UserProfile extends Component {
  state = {
    loading: true,
    shops: null,
    user: null,
    dashboard: false
  };

  /** Get info from database and session or from props if it is a dashboard */
  componentDidMount = () => {
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
        <div id="userProfile-header-container">
          <div id="userProfile-logo" className="box">
            <img src={this.state.user.profileurl} alt="logo dell'impresa" />
          </div>
          <UserProfileHeader
            profile={{
              name: this.state.user.username,
              description: this.state.user.reason,
              city: this.state.user.city,
              province: this.state.user.province,
              type: this.state.user.type
            }}
            info={[
              { title: "focolai supportati", data: this.state.user.number },
              { title: "indice rt", data: this.state.user.rt },
              { title: "contagiatore", data: this.state.user.challenger }
            ]}
            numberToViral={this.numberToGetViral()}
            dashboard={this.state.dashboard}
          />
          {/* <ProfileHeader
            dashboard={this.state.dashboard}
            name={this.state.user.username}
            info={[
              { title: "focolai supportati", data: this.state.user.number },
              { title: "indice rt", data: this.state.user.rt },
              { title: "contagiatore", data: this.state.user.challenger }
            ]}
            description={this.state.user.reason}
            city={this.state.user.city}
            province={this.state.user.province}
            buttonText={
              this.state.user.type === "viral"
                ? "profilo virale"
                : this.numberToGetViral() +
                  " contagi / investimenti per diventare virale"
            }
            style={this.state.user.type === "viral" ? {} : { fontSize: "1rem" }}
          /> */}
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
          {this.state.loading ? <Loading /> : body}
        </div>
      </div>
    );
  }
}

export default withRouter(UserProfile);
