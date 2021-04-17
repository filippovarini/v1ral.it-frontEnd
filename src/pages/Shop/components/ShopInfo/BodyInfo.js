import React, { Component } from "react";
import it from "../../../../locales/it.json";

/** Renders body info to be showed in the shop profile
 * @param city, street, province
 * @param email
 * @param instagram_link
 * @param facebook_link
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
    const instagram = this.props.instagram_link ? (
      <div className="flex-line shop-aside-line">
        <i className="fab fa-instagram-square shop-aside-icon"></i>
        <a
          href={this.props.instagram_link}
          className="shop-aside-text"
          rel="noreferrer"
          target="_blank"
        >
          {this.props.instagram_link}
        </a>
      </div>
    ) : null;

    const facebook = this.props.facebook_link ? (
      <div className="flex-line shop-aside-line">
        <i className="fab fa-facebook-square shop-aside-icon"></i>
        <a
          href={this.props.facebook_link}
          className="shop-aside-text"
          target="_blank"
          rel="noreferrer"
        >
          {this.props.facebook_link}
        </a>
      </div>
    ) : null;

    const phone = this.props.phone ? (
      <div className="flex-line shop-aside-line">
        <i className="fas fa-mobile shop-aside-icon"></i>
        <a href={`tel:${this.props.phone}`} className="shop-aside-text">
          {this.props.phone}
        </a>
      </div>
    ) : null;

    const email = this.props.email ? (
      <div className="flex-line shop-aside-line">
        <i className="fas fa-envelope shop-aside-icon"></i>
        <p className="shop-aside-text">{this.props.email}</p>
      </div>
    ) : null;

    const category = this.props.category ? (
      <div className="flex-line shop-aside-line">
        <i className="fas fa-hashtag shop-aside-icon"></i>
        <p className="shop-aside-text small-data-box">{this.props.category}</p>
      </div>
    ) : null;

    const place = (
      <div className="flex-line shop-aside-line">
        <i className="fas fa-map-marker-alt shop-aside-icon"></i>
        <p className="shop-aside-text">{this.computeAddress()}</p>
      </div>
    );

    return (
      <div id="shop-aside-bodyInfo" className="shop-aside-box box">
        <p className="shop-aside-header">{it.shop_aside_info}</p>
        {place}
        {phone}
        {email}
        {instagram}
        {facebook}
        {category}
      </div>
    );
  }
}

export default ShopInfo;
