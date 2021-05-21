import React, { Component } from "react";
import "./shopInfo.css";

import BodyInfo from "./BodyInfo";
import Gallery from "./Gallery";
import ShareShop from "./ShareShop";

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
 */
export class InfoWrapper extends Component {
  render() {
    return (
      <div id="info-wrapper">
        <BodyInfo
          phone={this.props.phone}
          instaLink={this.props.instaLink}
          fbLink={this.props.fbLink}
          website={this.props.website}
          city={this.props.city}
          province={this.props.province}
          street={this.props.street}
          email={this.props.emial}
          category={this.props.category}
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
