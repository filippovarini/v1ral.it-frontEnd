import React, { Component } from "react";
import "./shop.css";
import errorHandler from "../../functions/errorHandler";

// import ShopProfile from "./ShopProfile/ShopProfile";
import Loading from "../../components/Loading/Loading";
import ZoomImage from "../../components/ImageZoomed/ImageZoomed";
import ShopHead from "./components/ShopHead";
import ShopBody from "./components/ShopBody";
import ShopInfoWrapper from "./components/ShopInfo/InfoWrapper";

export class ShopRenderer extends Component {
  state = {
    loading: true,
    dashboard: false,
    shop: null,
    priviledges: null,
    totalSpent: 0,
    chargesEnabled: false,
    added: false,
    alreadyBought: null,
    imageZoomedIndex: 0,
    imagesZoomed: false,
    images: []
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
            priviledges: jsonRes.priviledges,
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

  /** Sets the page to loading
   * * @type dashboard, profile
   */
  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  /** Deletes image from gallery
   * @type dashboard
   */
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
    const passesLeft = this.state.shop
      ? this.state.shop.stocksNumber - this.state.shop.premiums
      : 0;

    let body = null;

    console.log(this.state.shop);
    if (this.state.shop) {
      body = (
        <div id="shop-profile" className="flex-line">
          <div id="shop-profile-body">
            <ShopHead
              shop={this.state.shop}
              priviledges={this.state.priviledges}
              passesLeft={passesLeft}
              dashboard={this.state.dashboard}
              added={this.state.added}
              alreadyBought={this.state.alreadyBought}
              setAdded={() => this.setState({ added: true })}
            />
            <ShopBody
              priviledges={this.state.priviledges}
              shop={this.state.shop}
              dashboard={this.state.dashboard}
            />
          </div>
          <ShopInfoWrapper
            phone={this.state.shop.phone}
            instagram_link={this.state.shop.instaLink}
            facebook_link={this.state.shop.fbLink}
            website={this.state.shop.website}
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
    );
  }
}

export default ShopRenderer;
