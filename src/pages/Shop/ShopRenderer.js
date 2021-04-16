import React, { Component } from "react";
import "./shop.css";
import errorHandler from "../../functions/errorHandler";

// import ShopProfile from "./ShopProfile/ShopProfile";
import ShopProfile from "./ShopProfile";
import ShopDashboard from "./ShopDashboard/ShopDashboard";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import ZoomImage from "../../components/ImageZoomed/ImageZoomed";

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
    alreadyBought: null,
    imageZoomedIndex: 0,
    imagesZoomed: false,
    images: [
      "https://i.picsum.photos/id/229/200/300.jpg?hmac=WD1_MXzGKrVpaJj2Utxv7FoijRJ6h4S4zrBj7wmsx1U",
      "https://i.picsum.photos/id/599/200/300.jpg?hmac=E2gUK85wncj5qALDLpEjQzqgfazui9pDGMgzVWMpqo4",
      "https://i.picsum.photos/id/864/200/300.jpg?hmac=pHxnt4rXpNHIqBRpVSe-yL_pDtdwDfasgfub8GwI5mw",
      "https://i.picsum.photos/id/939/200/300.jpg?hmac=cj4OIUh8I6eW-hwT25m1_dCA6ZsAmSYixKCgsbZZmXk"
    ]
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    const id = this.props.match.params.id;
    fetch(`/page/shop/${id}`)
      .then(res => res.json())
      .then(jsonRes => {
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

  getHandleClicks = () => {
    let next =
      this.state.imageZoomedIndex + 1 === this.state.images.length
        ? null
        : () =>
            this.setState({
              imageZoomedIndex: this.state.imageZoomedIndex + 1
            });
    let prev =
      this.state.imageZoomedIndex === 0
        ? null
        : () =>
            this.setState({
              imageZoomedIndex: this.state.imageZoomedIndex - 1
            });
    return { prev, next };
  };

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  copmputeBarChartWidth = () => {
    let barChartWidth = null;
    const div = document.getElementById("shop-profile-body");
    if (div) {
      barChartWidth = div.clientWidth;
    }
    return barChartWidth;
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
        getBarChartWidth={this.copmputeBarChartWidth}
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
        alreadyBought={this.state.alreadyBought}
        cases={this.state.cases}
        images={this.state.images}
        getBarChartWidth={this.copmputeBarChartWidth}
        zoomImage={i =>
          this.setState({ imageZoomedIndex: i, imagesZoomed: true })
        }
      />
    );

    return (
      <div>
        <Header />
        <div className="page-wrapper">
          {this.state.loading ? <Loading class="page-loading" /> : body}
          {this.state.imagesZoomed ? (
            <ZoomImage
              image={this.state.images[this.state.imageZoomedIndex]}
              handleClicks={this.getHandleClicks()}
              hide={() => this.setState({ imagesZoomed: false })}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default ShopRenderer;
