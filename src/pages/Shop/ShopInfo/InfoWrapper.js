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
 */
export class InfoWrapper extends Component {
  render() {
    return (
      <div id="info-wrapper">
        <BodyInfo
          phone={3206265132}
          instagram_link="https://www.instagram.com/sant.ippo/"
          facebook_link="https://www.facebook.com/thejackalweb/"
          city={this.props.city}
          province={this.props.province}
          street={this.props.street}
          email={this.props.emial}
          category={this.props.category}
        />
        <Gallery images={this.props.images} zoomImage={this.props.zoomImage} />
        <ShareShop shopName={this.props.name} />
      </div>
    );
  }
}

export default InfoWrapper;
