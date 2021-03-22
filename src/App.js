import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import errorHandler from "./functions/errorHandler";

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
// transaction
import Checkout from "./pages/Checkout/Checkout";
import TransactionSuccess from "./pages/TransactionSuccess/TransactionSuccess";

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
            user: {
              name: jsonRes.name,
              userProfile: jsonRes.userProfile,
              id: jsonRes.id
            }
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
          <Route exact path="/shop/profile/:id" component={ShopProfile} />
          <Route exact path="/user/profile/:username" component={UserProfile} />
          <Route
            exact
            path="/shop/dashboard/:id"
            render={() => <ShopProfile dashboard={true} />}
          />
          <Route
            exact
            path="/user/dashboard/:username"
            render={() => <UserProfile dashboard={true} />}
          />
          <Route exact path="/shop/register/services" component={Services} />
          <Route exact path="/shop/register/goals" component={Goals} />
          <Route exact path="/workplace" component={Workplace} />
          <Route exact path="/login" component={UserLogin} />
          <Route exact path="/checkout" component={Checkout} />
          <Route
            path="/success/:transactionId"
            component={TransactionSuccess}
          />
          <Route exact path="/error" component={Error} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
