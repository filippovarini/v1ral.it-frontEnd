import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./StandardStyle.css";

import Home from "./pages/Home/Home";
import Shops from "./pages/Shops/Shops";
import ShopProfile from "./pages/ShopProfile/ShopProfile";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/shops" component={Shops} />
          <Route path="/shop/:username" component={ShopProfile} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
