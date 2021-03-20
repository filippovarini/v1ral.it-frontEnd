/* 
1. get username as route param 
2. get shop associated with it from db
3. output info
*/
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import errorHandler from "../../errorHandler";
import "./shopProfile.css";

import Header from "../../components/Header/Header";
import ShopProfileHeader from "./components/ProfileHeader/ShopProfileHeader";
import Navigator from "../../components/Navigator/Navigator";
// import ServiceBoxes from "../../components/ServiceBoxes/ServiceBoxes";
import Services from "../../components/Services/Services";
import Goals from "../../components/Goals/Goals";
import Info from "./components/Info/Info";
import Loading from "../../components/Loading/Loading";
import InsertChallenger from "../../components/InsertChallenger/Challenger";

export class ShopProfile extends Component {
  state = {
    loading: true,
    navState: 0,
    shop: null,
    added: false,
    insertChallengerHidden: true
  };

  toggleChallenger = () => {
    this.setState({
      insertChallengerHidden: !this.state.insertChallengerHidden
    });
  };

  /** Get info from database and session */
  componentDidMount = () => {
    const id = this.props.history.location.pathname.split("/").slice(-1)[0];
    fetch(`/page/shopProfile/${id}`)
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success)
          this.setState({
            shop: jsonRes.shop,
            added: jsonRes.added,
            services: jsonRes.services,
            goals: jsonRes.goals
          });
        else errorHandler.serverError(jsonRes);
        this.setState({ loading: false });
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  /** Adds shop to the cart
   * If not validated, lets the user insert the challenger or login
   */
  handleSubmit = () => {
    this.setState({ loading: true });
    fetch("/shop/updateCart", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ shopId: this.state.shop.id })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (!jsonRes.success) {
          if (jsonRes.insertChallenger) this.toggleChallenger();
          else this.props.history.push("/login");
        } else this.setState({ added: true });
        this.setState({ loading: false });
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  updateNav = i => this.setState({ navState: i });

  getGoalsDone = () => {
    const totalGoals = this.state.goals.reduce(
      (acc, goal) => acc + goal.amount,
      0
    );
    return (parseFloat(this.state.shop.financed_so_far) / totalGoals).toFixed(
      2
    );
  };

  render() {
    let bodyComponent =
      this.state.navState === 0 ? (
        <div id="boxes-container">
          <Services services={this.state.services || []} />
          <Goals goals={this.state.goals || []} />
        </div>
      ) : (
        <Info />
      );

    const body = this.state.shop ? (
      <div className="page-wrapper">
        <div id="shopProfile-header-container">
          <InsertChallenger
            hidden={this.state.insertChallengerHidden}
            hide={this.toggleChallenger}
            alreadyAccountRedirection="/login"
            successRedirection={this.props.history.location.pathname}
          />
          <div id="shopProfile-logo" className="box">
            <img
              src="http://www.ciroamergellina.it/wp-content/themes/yootheme/cache/Logo-Ciro-a-Mergellina-detto-o-nas-e-cane-9075f8fa.png"
              alt="logo dell'impresa"
            />
          </div>
          <ShopProfileHeader
            name={this.state.shop.name}
            services={this.state.services.length}
            totalCases={this.state.shop.total_premiums}
            viralCases={this.state.shop.viral_premiums}
            description={this.state.shop.bio}
            goalsDonePercentage={this.getGoalsDone()}
            handleSubmit={this.handleSubmit}
            added={this.state.added}
          />
        </div>
        <div id="shopProfile-nav">
          <Navigator
            active={this.state.navState}
            updateNav={this.updateNav}
            titles={["Servizi Premium", "Info Focolaio"]}
          />
        </div>
        {bodyComponent}
      </div>
    ) : null;
    return (
      <div>
        <Header titles={[{ name: "carrello" }, { name: "profilo" }]} />
        <div className="page-wrapper">
          {this.state.loading ? <Loading /> : body}
        </div>
      </div>
    );
  }
}

export default withRouter(ShopProfile);
