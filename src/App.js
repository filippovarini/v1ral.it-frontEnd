import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

// style
import "./style/tags.css";
import "./style/logForm.css";
import "./style/boxes.css";
import "./style/text.css";
import "./style/quickFacts.css";
import "./style/communicationPanel.css";
import "./style/buttons.css";
import "./style/vars.css";
import "./style/general.css";
import "./style/addInfoPopUp.css";

// components
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Shops from "./pages/Shops/Shops";
import Shop from "./pages/Shop/Renderer";
import User from "./pages/User/UserRenderer";
import Checkout from "./pages/Checkout/CheckoutRenderer";
import TransactionSuccess from "./pages/TransactionSuccess/TransactionSuccess";
import BioInfo from "./pages/ShopRegister/BioInfo/BioInfo";
import ShopCredentials from "./pages/ShopRegister/ShopCredentials/ShopCredentials";
import Stock from "./pages/ShopRegister/Stock/Stock";
import ShopGoals from "./pages/ShopRegister/ShopGoals/ShopGoals";
import ShopRegisterDone from "./pages/ShopRegister/ShopRegisterDone";
import GetPayed from "./pages/ShopRegister/GetPayed/GetPayed";
import Spread from "./pages/Spread/Spread";
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Admin";
import Maintenance from "./pages/Maintenance/Maintenance";
import Login from "./pages/Login/Login";
import RecoverPassword from "./pages/RecoverPassword/RecoverPassword";
import NotFound from "./pages/NotFound/NotFound";
import ErrorPage from "./pages/Error/Error";
import Help from "./pages/Help/Help";
import BugFound from "./components/BugFound/BugFound";
import Footer from "./components/Footer/Footer";

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
              id: jsonRes.id,
              email: jsonRes.email,
              address: jsonRes.address
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
          <Header />
          <div>
            {this.state.maintenance &&
            window.location.pathname !== "/admin/login" &&
            window.location.pathname !== "/admin" ? (
              <Switch>
                <Route exact path="/admin/login" component={AdminLogin} />
                <Route exact path="/admin" component={AdminDashboard} />
                <Route exact path="/error" component={ErrorPage} />
                <Route exact path="/help" component={Help} />
                <Route path="*" component={Maintenance} />
              </Switch>
            ) : (
              <div>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/shops" component={Shops} />
                  <Route exact path="/shop/register/bio" component={BioInfo} />
                  <Route
                    exact
                    path="/shop/register/credentials"
                    component={ShopCredentials}
                  />
                  <Route path="/shop/register/stock" component={Stock} />
                  <Route path="/shop/register/goals" component={ShopGoals} />
                  <Route path="/shop/register/getPayed" component={GetPayed} />
                  <Route
                    path="/shop/register/done/:connectedId"
                    component={ShopRegisterDone}
                  />
                  <Route exact path="/spread" component={Spread} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/recover" component={RecoverPassword} />
                  <Route
                    exact
                    path="/user/checkout"
                    render={() => <Checkout type="user" />}
                  />
                  <Route
                    exact
                    path="/shop/checkout"
                    render={() => <Checkout type="shop" />}
                  />
                  <Route exact path="/user/:username" component={User} />
                  <Route exact path="/shop/:id" component={Shop} />
                  <Route
                    path="/success/:transactionId"
                    component={TransactionSuccess}
                  />
                  <Route exact path="/admin/login" component={AdminLogin} />
                  <Route exact path="/admin" component={AdminDashboard} />
                  <Route exact path="/error" component={ErrorPage} />
                  <Route exact path="/help" component={Help} />
                  <Route exact path="*" component={NotFound} />
                </Switch>
              </div>
            )}
            <BugFound />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
