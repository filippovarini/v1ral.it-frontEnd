/* 
1. get username as route param 
2. get shop associated with it from db
3. output info
*/
import React, { Component } from "react";
import "./shopProfile.css";

import ShopProfileHeader from "./components/ProfileHeader/ShopProfileHeader";
import Navigator from "../../components/Navigator/Navigator";
import ServiceBoxes from "./components/ServiceBoxes/ServiceBoxes";
import Info from "./components/Info/Info";

// faq data
import services from "../../faqData/services";

export class ShopProfile extends Component {
  state = {
    navState: 0,
    name: "Ciro a mergellina",
    goalsDone: 3,
    totalCases: 233454,
    dailyCases: 12300,
    goalsDonePercentage: 59,
    description:
      "Siamo un'impresa familiare con 127 anni di storia. Il covid ci ha costretto a licenziare il 75% del personale. Utilizzeremo i finanziamenti per riassumere il nostro team e riportare sul mercato i nostri fantastici prodotti"
  };

  updateNav = i => this.setState({ navState: i });

  render() {
    let bodyComponent = null;
    switch (this.state.navState) {
      case 0:
        bodyComponent = (
          <ServiceBoxes
            boxes={[
              { type: "premium", services },
              { type: "viral", services }
            ]}
          />
        );
        break;
      case 1:
        bodyComponent = <Info />;
        break;
      default:
        throw "Only 0 or 1 as navigator state permitted";
    }
    return (
      <div className="page-wrapper">
        <div id="shopProfile-header-container">
          <div id="shopProfile-logo" className="box">
            <img
              src="http://www.ciroamergellina.it/wp-content/themes/yootheme/cache/Logo-Ciro-a-Mergellina-detto-o-nas-e-cane-9075f8fa.png"
              alt="logo dell'impresa"
            />
          </div>
          <ShopProfileHeader
            name={this.state.name}
            goalsDone={this.state.goalsDone}
            totalCases={this.state.totalCases}
            dailyCases={this.state.dailyCases}
            description={this.state.description}
            goalsDonePercentage={this.state.goalsDonePercentage}
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
    );
  }
}

export default ShopProfile;
