import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./StandardStyle/tags.css";
import "./StandardStyle/forms.css";
import "./StandardStyle/boxes.css";

import Workplace from "./workplace/workplace";

import Home from "./pages/Home/Home";
import Shops from "./pages/Shops/Shops";
import ShopProfile from "./pages/ShopProfile/ShopProfile";

// shop register
import BioInfo from "./pages/ShopRegister/BioInfo/BioInfo";
import Services from "./pages/ShopRegister/Services";
import Goals from "./pages/ShopRegister/Goals";

export class App extends Component {
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
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
