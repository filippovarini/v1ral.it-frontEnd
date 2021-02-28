import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./StandardStyle.css";

import Home from "./pages/Home/Home";
import Shops from "./pages/Shops/Shops";
import ShopProfile from "./pages/ShopProfile/Shop";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/shops" component={Shops} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
