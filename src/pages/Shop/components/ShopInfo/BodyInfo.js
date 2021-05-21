import React, { Component } from "react";
import it from "../../../../locales/it.json";

/** Renders body info to be showed in the shop profile
 * @param city, street, province
 * @param email
 * @param instaLink
 * @param fbLink
 * @param website
 * @param phone
 * @param tags
 * @param category
 */
export class ShopInfo extends Component {
  /** Computes address for shop info. Uses try catch to handle null pointer
   * exception
   */
  computeAddress = () => {
    try {
      return `${this.props.street}, ${this.props.city} ${this.props.province}`;
    } catch (e) {
      return null;
    }
  };

  render() {
    const instagram = this.props.instaLink ? (
      <div className="flex-line body-box-line">
        <i className="fab fa-instagram-square body-box-icon"></i>
        <a
          href={this.props.instaLink}
          className="body-box-text"
          rel="noreferrer"
          target="_blank"
        >
          {this.props.instaLink}
        </a>
      </div>
    ) : null;

    const facebook = this.props.fbLink ? (
      <div className="flex-line body-box-line">
        <i className="fab fa-facebook-square body-box-icon"></i>
        <a
          href={this.props.fbLink}
          className="body-box-text"
          target="_blank"
          rel="noreferrer"
        >
          {this.props.fbLink}
        </a>
      </div>
    ) : null;

    const website = this.props.website ? (
      <div className="flex-line body-box-line">
        <i className="fas fa-globe body-box-icon"></i>
        <a
          href={this.props.website}
          className="body-box-text"
          target="_blank"
          rel="noreferrer"
        >
          {this.props.website}
        </a>
      </div>
    ) : null;

    const phone = this.props.phone ? (
      <div className="flex-line body-box-line">
        <i className="fas fa-mobile body-box-icon"></i>
        <a href={`tel:${this.props.phone}`} className="body-box-text">
          {this.props.phone}
        </a>
      </div>
    ) : null;

    const email = this.props.email ? (
      <div className="flex-line body-box-line">
        <i className="fas fa-envelope body-box-icon"></i>
        <p className="body-box-text">{this.props.email}</p>
      </div>
    ) : null;

    const category = this.props.category ? (
      <div className="flex-line body-box-line">
        <i className="fas fa-hashtag body-box-icon"></i>
        <p className="body-box-text small-data-box">{this.props.category}</p>
      </div>
    ) : null;

    const place = (
      <div className="flex-line body-box-line">
        <i className="fas fa-map-marker-alt body-box-icon"></i>
        <p className="body-box-text">{this.computeAddress()}</p>
      </div>
    );

    return (
      <div id="shop-aside-bodyInfo" className="body-box box">
        <p className="body-box-header">{it.shop_aside_info}</p>
        {place}
        {phone}
        {email}
        {instagram}
        {facebook}
        {website}
        {category}
      </div>
    );
  }
}

export default ShopInfo;
