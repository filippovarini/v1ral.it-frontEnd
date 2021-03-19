import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import errorHandler from "./errorHandler";
import "./StandardStyle/tags.css";
import "./StandardStyle/forms.css";
import "./StandardStyle/boxes.css";
import "./StandardStyle/text.css";

import Workplace from "./workplace/workplace";

import Home from "./pages/Home/Home";
import Shops from "./pages/Shops/Shops";
import ShopProfile from "./pages/ShopProfile/ShopProfile";

// shop register
import BioInfo from "./pages/ShopRegister/BioInfo/BioInfo";
import Services from "./pages/ShopRegister/Services";
import Goals from "./pages/ShopRegister/Goals";

// user log
import UserLogin from "./pages/UserLogin/UserLogin";

// error
import Error from "./pages/Error/Error";

export class App extends Component {
  componentDidMount = () => {
    // fetch user profile and name
    fetch("/page/header")
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success)
          this.props.dispatch({
            type: "SET-USER",
            user: { name: jsonRes.name, userProfile: jsonRes.userProfile }
          });
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/shops" component={Shops} />
          <Route exact path="/shop/profile/:username" component={ShopProfile} />
          <Route exact path="/shop/register/bio" component={BioInfo} />
          <Route exact path="/shop/register/services" component={Services} />
          <Route exact path="/shop/register/goals" component={Goals} />
          <Route exact path="/workplace" component={Workplace} />
          <Route exact path="/login" component={UserLogin} />
          <Route exact path="/error" component={Error} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
