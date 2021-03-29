import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

// style
import "./StandardStyle/tags.css";
import "./StandardStyle/forms.css";
import "./StandardStyle/boxes.css";
import "./StandardStyle/text.css";
import "./StandardStyle/quickFacts.css";
import "./StandardStyle/communicationPanel.css";

import Workplace from "./workplace/workplace";

import Home from "./pages/Home/Home";
import Shops from "./pages/Shops/Shops";

// profiles
import ShopProfile from "./pages/ShopProfile/ShopProfile";
import UserProfile from "./pages/UserProfile/UserProfile";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import ShopDashboard from "./pages/ShopDashboard/ShopDashboard";

// transaction
import UserCheckout from "./pages/Checkout/UserCheckout";
import ShopCheckout from "./pages/Checkout/ShopCheckout";
import TransactionSuccess from "./pages/TransactionSuccess/TransactionSuccess";

// shop register
import BioInfo from "./pages/ShopRegister/BioInfo/BioInfo";
import ShopCredentials from "./pages/ShopRegister/ShopCredentials/ShopCredentials";
import ServicesOffered from "./pages/ShopRegister/ServiceOffered/ServicesOffered";
import ShopGoals from "./pages/ShopRegister/ShopGoals/ShopGoals";
import ShopRegisterDone from "./pages/ShopRegister/ShopRegisterDone";
import Spread from "./pages/Spread/Spread";

// admin
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Admin";

import Maintenance from "./pages/Maintenance/Maintenance";

import Login from "./pages/Login/Login";

// error
import Error from "./pages/Error/Error";

export class App extends Component {
  state = {
    maintenance: null
  };

  componentDidMount = () => {
    // fetch user profile and name
    this.getMaintenance();
    fetch("/page/header")
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success)
          this.props.dispatch({
            type: "SET-USER",
            user: {
              name: jsonRes.name,
              userProfile: jsonRes.userProfile,
              id: jsonRes.id
            }
          });
      })
      .catch(e => {
        console.log(e);
        alert("no connection");
      });
  };

  getMaintenance = async () => {
    const maintenance = await fetch("/maintenance");
    const parsedMaintenance = await maintenance.json();
    this.setState({ maintenance: parsedMaintenance.maintenance });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          {this.state.maintenance &&
          window.location.pathname !== "/admin/login" &&
          window.location.pathname !== "/admin" ? (
            <Route path="*" component={Maintenance} />
          ) : (
            <div>
              <Route exact path="/" component={Home} />
              <Route exact path="/shops" component={Shops} />
              <Route exact path="/shop/profile/:id" component={ShopProfile} />
              <Route
                exact
                path="/user/profile/:username"
                component={UserProfile}
              />
              <Route exact path="/shop/dashboard" component={ShopDashboard} />
              <Route exact path="/user/dashboard" component={UserDashboard} />
              <Route exact path="/shop/register/bio" component={BioInfo} />
              <Route
                exact
                path="/shop/register/credentials"
                component={ShopCredentials}
              />
              <Route
                path="/shop/register/services"
                component={ServicesOffered}
              />
              <Route path="/shop/register/goals" component={ShopGoals} />
              <Route path="/shop/register/done" component={ShopRegisterDone} />
              <Route exact path="/spread" component={Spread} />
              <Route exact path="/workplace" component={Workplace} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/user/checkout" component={UserCheckout} />
              <Route exact path="/shop/checkout" component={ShopCheckout} />
              <Route
                path="/success/:transactionId"
                component={TransactionSuccess}
              />
            </div>
          )}

          <Route exact path="/admin/login" component={AdminLogin} />
          <Route exact path="/admin" component={AdminDashboard} />
          <Route exact path="/error" component={Error} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
