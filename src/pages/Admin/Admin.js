import React, { Component } from "react";
import errorHandler from "../../functions/errorHandler";
import "./admin.css";

import Loading from "../../components/Loading/Loading";
import Navigator from "./privateComponents/Navigator";
import Dashboard from "./privateComponents/Dashboard";
import Products from "./privateComponents/Products";
import AdminList from "./privateComponents/AdminList";
import Bugs from "./privateComponents/Bugs";

export class Admin extends Component {
  state = {
    loading: true,
    navState: 0,
    superAdmin: false,
    userStats: null,
    shopOrders: null,
    challengerOrders: null,
    products: null,
    admins: null,
    maintenanceStatus: null,
    bugs: []
  };

  updateNav = i => {
    this.setState({ navState: i });
  };

  componentDidMount = () => {
    fetch("/admin/home")
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          this.setState({
            loading: false,
            superAdmin: jsonRes.superAdmin,
            userStats: jsonRes.userStats,
            shopOrders: jsonRes.shopOrders,
            challengerOrders: jsonRes.challengerOrders,
            products: jsonRes.products,
            admins: jsonRes.admins,
            maintenanceStatus: jsonRes.maintenanceStatus,
            bugs: jsonRes.bugs
          });
        } else {
          if (jsonRes.serverError) errorHandler.serverError();
          this.props.history.push("/");
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  handleLogout = () => {
    fetch("/logout", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(() => (window.location = "/"))
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  getTotalPrice = array => {
    return array ? array.reduce((acc, data) => acc + data.price, 0) : 0;
  };

  render() {
    let bodyComponent = null;

    switch (this.state.navState) {
      case 0:
        bodyComponent = (
          <Dashboard
            userStats={this.state.userStats}
            userOrders={this.getTotalPrice(this.state.challengerOrders)}
            shopOrders={this.getTotalPrice(this.state.shopOrders)}
          />
        );
        break;
      case 1:
        bodyComponent = <Products products={this.state.products} />;
        break;
      case 3:
        bodyComponent = <Bugs bugs={this.state.bugs} />;
        break;
      case 4:
        bodyComponent = <AdminList admins={this.state.admins} />;
        break;
      default:
        bodyComponent = null;
    }

    const body = (
      <div>
        <Navigator
          navState={this.state.navState}
          updateNav={this.updateNav}
          superAdmin={this.state.superAdmin}
          maintenanceStatus={this.state.maintenanceStatus}
        />
        <div id="admin-dashboard-wrapper">
          <div id="remember-logout" className="flex-line">
            <p id="logout-text">
              Effettua il logout prima di chiudere il browser!
            </p>
            <p
              className="button small"
              id="logout-button"
              onClick={this.handleLogout}
            >
              logout
            </p>
          </div>
          {bodyComponent}
        </div>
      </div>
    );
    return (
      <div className="page-wrapper">
        {this.state.loading ? <Loading class="page-loading" /> : body}
      </div>
    );
  }
}

export default Admin;
