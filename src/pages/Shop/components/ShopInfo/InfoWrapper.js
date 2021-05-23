import React, { Component } from "react";
import "./shopInfo.css";

import errorHandler from "../../../../functions/errorHandler";

import BodyInfo from "./BodyInfo";
import Gallery from "./Gallery";
import ShareShop from "./ShareShop";
import ValidateStripeAccount from "../../../../components/ValidateStripeAccount/ValidateStripeAccount";

/** Renders both bodyInfo and gallery. If screen is wide, show on side,
 * otherwise show it as an option
 * @param city, street, province
 * @param email
 * @param instagram_link
 * @param facebook_link
 * @param phone
 * @param tags
 * @param category
 * @param images
 * @param dashboard
 * @param connectedId
 */
export class InfoWrapper extends Component {
  state = {
    stripeVerificationLoading: true,
    chargesEnabled: false,
    connectedId: null
  };
  /** If we are in the dashboard, get info about stripe account validation
   */
  componentDidMount = () => {
    if (this.props.dashboard) {
      fetch("/shop/stripeStatus")
        .then(res => res.json())
        .then(jsonRes => {
          console.log(jsonRes);
          if (jsonRes.success) {
            this.setState({
              stripeVerificationLoading: false,
              chargesEnabled: jsonRes.chargesEnabled,
              connectedId: jsonRes.connectedId
            });
          } else {
            if (jsonRes.serverError) {
              errorHandler.serverError();
            }
          }
        })
        .catch(e => {
          console.log(e);
          errorHandler.clientError();
        });
    }
  };

  render() {
    return (
      <div id="info-wrapper">
        {this.props.dashboard &&
        !this.state.stripeVerificationLoading &&
        !this.state.chargesEnabled ? (
          <ValidateStripeAccount
            shopId={this.props.toggleLoading}
            redirectPath={window.location.pathname}
            connectedId={this.state.connectedId}
          />
        ) : null}

        <BodyInfo
          phone={this.props.phone}
          instaLink={this.props.instaLink}
          fbLink={this.props.fbLink}
          website={this.props.website}
          city={this.props.city}
          province={this.props.province}
          street={this.props.street}
          email={this.props.email}
          category={this.props.category}
          dashboard={this.props.dashboard}
        />
        <Gallery
          images={this.props.images}
          zoomImage={this.props.zoomImage}
          dashboard={this.props.dashboard}
        />
        <ShareShop
          shopName={this.props.name}
          dashboard={this.props.dashboard}
        />
      </div>
    );
  }
}

export default InfoWrapper;
