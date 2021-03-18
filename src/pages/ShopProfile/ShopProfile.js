/* 
1. get username as route param 
2. get shop associated with it from db
3. output info
*/
import React, { Component } from "react";
import "./shopProfile.css";

import Header from "../../components/Header/Header";
import ShopProfileHeader from "./components/ProfileHeader/ShopProfileHeader";
import Navigator from "../../components/Navigator/Navigator";
import ServiceBoxes from "../../components/ServiceBoxes/ServiceBoxes";
import Info from "./components/Info/Info";
import Loading from "../../components/Loading/Loading";

// faq data
import services from "../../faqData/services";

import errorHandler from "../Error/ErrorHandler";

const faqState = {
  navState: 0,
  name: "Ciro a mergellina",
  goalsDone: 3,
  totalCases: 233454,
  dailyCases: 12300,
  goalsDonePercentage: 59,
  description:
    "Siamo un'impresa familiare con 127 anni di storia. Il covid ci ha costretto a licenziare il 75% del personale. Utilizzeremo i finanziamenti per riassumere il nostro team e riportare sul mercato i nostri fantastici prodotti"
};

export class ShopProfile extends Component {
  state = {
    loading: true,
    navState: 0,
    shop: null
  };

  componentDidMount = () => {
    const id = this.props.history.location.pathname.split("/").slice(-1)[0];
    fetch(`/page/shopProfile/${id}`)
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) this.setState({ shop: jsonRes.shop });
        else errorHandler(jsonRes);
        this.setState({ loading: false });
      })
      .catch(e => {
        console.log(e);
        this.props.history.push("/error");
      });
  };

  updateNav = i => this.setState({ navState: i });

  render() {
    console.log(this.state.shop);
    let bodyComponent =
      this.state.navState === 0 ? (
        <ServiceBoxes
          boxes={[
            { type: "premium", services },
            { type: "viral", services }
          ]}
        />
      ) : (
        <Info />
      );

    const body = this.state.shop ? (
      <div className="page-wrapper">
        <div id="shopProfile-header-container">
          <div id="shopProfile-logo" className="box">
            <img
              src="http://www.ciroamergellina.it/wp-content/themes/yootheme/cache/Logo-Ciro-a-Mergellina-detto-o-nas-e-cane-9075f8fa.png"
              alt="logo dell'impresa"
            />
          </div>
          <ShopProfileHeader
            name={this.state.shop.name}
            goalsDone={-1}
            totalCases={this.state.shop.premiums}
            dailyCases={-1}
            description={this.state.shop.bio}
            goalsDonePercentage={this.state.shop.goalsdone}
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

export default ShopProfile;
