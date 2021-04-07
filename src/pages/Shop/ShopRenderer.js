import React, { Component } from "react";
import errorHandler from "../../functions/errorHandler";

import ShopProfile from "./ShopProfile/ShopProfile";
import ShopDashboard from "./ShopDashboard/ShopDashboard";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";

export class ShopRenderer extends Component {
  state = {
    loading: true,
    dashboard: false,
    shop: null,
    goals: null,
    services: null,
    cases: null,
    totalSpent: 0,
    chargesEnabled: false,
    added: false,
    alreadyBought: null
    // navState: 0,
  };

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    const id = this.props.match.params.id;
    fetch(`/page/shop/${id}`)
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes);
        if (jsonRes.success) {
          this.setState({
            shop: jsonRes.shop,
            goals: jsonRes.goals,
            services: jsonRes.services,
            cases: jsonRes.cases,
            added: jsonRes.added,
            alreadyBought: jsonRes.alreadyBought,
            dashboard: jsonRes.dashboard,
            totalSpent: jsonRes.totalSpent,
            chargesEnabled: jsonRes.chargesEnabled,
            loading: false
          });
        } else if (jsonRes.invalidShopId) {
          alert(jsonRes.message);
          window.location = "/";
        } else {
          errorHandler.serverError(jsonRes);
          this.setState({ loading: false });
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    const body = this.state.dashboard ? (
      <ShopDashboard
        toggleLoading={this.toggleLoading}
        loading={this.state.loading}
        shop={this.state.shop}
        services={this.state.services}
        goals={this.state.goals}
        cases={this.state.cases}
        totalSpent={this.state.totalSpent}
        chargesEnabled={this.state.chargesEnabled}
      />
    ) : (
      <ShopProfile
        toggleLoading={this.toggleLoading}
        setAdded={() => this.setState({ added: true })}
        loading={this.state.loading}
        shop={this.state.shop}
        services={this.state.services}
        goals={this.state.goals}
        added={this.state.added}
        alreadyBought={this.setState.alreadyBought}
        cases={this.state.cases}
      />
    );

    return (
      <div>
        <Header />
        <div className="page-wrapper">
          {this.state.loading ? <Loading class="page-loading" /> : body}
        </div>
      </div>
    );
  }
}

export default ShopRenderer;
