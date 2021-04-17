import React, { Component } from "react";
import "./shop.css";
import errorHandler from "../../functions/errorHandler";
import getGoalsDone from "../../functions/goalsDone";

import it from "../../locales/it.json";

// import ShopProfile from "./ShopProfile/ShopProfile";
import ShopProfile from "./Profile";
import ShopDashboard from "./Dashboard";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import ZoomImage from "../../components/ImageZoomed/ImageZoomed";

import ShopHead from "./components/ShopHead";
import Navigator from "../../components/Navigator/Navigator";
import ShopBody from "./components/ShopBody";
import ShopInfoWrapper from "./components/ShopInfo/InfoWrapper";

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
    images: [],
    navState: 0
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
            images: jsonRes.images,
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

  updateNav = i => this.setState({ navState: i });

  /** Get functions to fire when user clicks arrows when zooming images in
   * galley */
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

  /** Get optimal barChart width to fit into the shop-profile-body */
  copmputeBarChartWidth = () => {
    let barChartWidth = null;
    const div = document.getElementById("shop-profile-body");
    if (div) {
      barChartWidth = div.clientWidth;
    }
    return barChartWidth;
  };

  /** Get total money the shop has in the goals */
  getDisruptionIndex = () => {
    return this.state.goals
      ? this.state.goals.reduce((acc, goal) => acc + goal.amount, 0)
      : 0;
  };

  /** Deletes image from gallery */
  deleteImage = () => {
    this.setState({ loading: true, imagesZoomed: false });
    fetch("/shop/image", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        url: this.state.images[this.state.imageZoomedIndex]
      })
    })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes);
        if (!jsonRes.success) {
          alert(jsonRes.message);
          if (jsonRes.serverError) errorHandler.serverError(jsonRes);
        } else window.location = window.location.pathname;
      });
  };

  render() {
    console.log(this.state.images);
    const passesLeft = this.state.shop
      ? this.state.shop.maxpremiums - this.state.shop.total_premiums
      : 0;

    let body = this.state.dashboard ? (
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
        passesLeft={passesLeft}
        images={this.state.images}
        zoomImage={i =>
          this.setState({ imageZoomedIndex: i, imagesZoomed: true })
        }
      />
    ) : (
      <ShopProfile
        toggleLoading={this.toggleLoading}
        loading={this.state.loading}
        shop={this.state.shop}
        services={this.state.services}
        goals={this.state.goals}
        cases={this.state.cases}
        added={this.state.added}
        alreadyBought={this.state.alreadyBought}
        setAdded={() => this.setState({ added: true })}
        images={this.state.images}
        getBarChartWidth={this.copmputeBarChartWidth}
        zoomImage={i =>
          this.setState({ imageZoomedIndex: i, imagesZoomed: true })
        }
        passesLeft={passesLeft}
      />
    );

    if (this.state.shop) {
      body = (
        <div id="shop-profile" className="flex-line">
          <div id="shop-profile-body">
            <ShopHead
              shop={this.state.shop}
              services={this.state.services}
              passesLeft={passesLeft}
              goalsDone={getGoalsDone(
                this.state.shop.financed_so_far,
                this.getDisruptionIndex()
              )}
              dashboard={this.state.dashboard}
              added={this.state.added}
              alreadyBought={this.state.alreadyBought}
              setAdded={() => this.setState({ added: true })}
            />
            <div id="shop-nav">
              <Navigator
                active={this.state.navState}
                updateNav={this.updateNav}
                titles={["Dove vanno i soldi?", it.stats]}
              />
            </div>
            <ShopBody
              goals={this.state.goals}
              services={this.state.services}
              cases={this.state.cases}
              getBarChartWidth={this.copmputeBarChartWidth}
              navState={this.state.navState}
            />
          </div>
          <ShopInfoWrapper
            phone={3206265132}
            instagram_link="https://www.instagram.com/sant.ippo/"
            facebook_link="https://www.facebook.com/thejackalweb/"
            city={this.state.shop.city}
            province={this.state.shop.province}
            street={this.state.shop.street}
            email={this.state.shop.emial}
            category={this.state.shop.category}
            name={this.state.shop.name}
            images={this.state.images}
            zoomImage={i =>
              this.setState({ imageZoomedIndex: i, imagesZoomed: true })
            }
            dashboard={this.state.dashboard}
          />
        </div>
      );
    }

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
              deleteImage={this.state.dashboard ? this.deleteImage : null}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default ShopRenderer;
