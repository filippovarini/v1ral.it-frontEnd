import React, { Component } from "react";
import it from "../../../../locales/it.json";
import errorHandler from "../../../../functions/errorHandler";

import SmallLoading from "../../../../components/Loading/SmallLoading";

/** Renders body info to be showed in the shop profile
 * @param city, street, province
 * @param email
 * @param instaLink
 * @param fbLink
 * @param website
 * @param phone
 * @param tags
 * @param category
 * @param dashboard
 */
export class ShopInfo extends Component {
  state = {
    insta_link: null,
    fb_link: null,
    website: null,
    phone: null,
    loading: false
  };

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

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const submittedInfoId = e.target.querySelector("input").id;
    const submittedInfo = this.state[submittedInfoId];
    if (submittedInfo) {
      this.setState({ loading: true });
      fetch("/shop/updateInfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ update: { [submittedInfoId]: submittedInfo } })
      })
        .then(res => res.json())
        .then(jsonRes => {
          if (!jsonRes.success) {
            alert(jsonRes.message);
            if (jsonRes.serverError) {
              errorHandler.serverError(jsonRes);
            }
          }
          window.location = window.location.pathname;
        })
        .catch(e => {
          console.log(e);
          errorHandler.clientError();
        });
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
    ) : this.props.dashboard ? (
      <form className="flex-line body-box-line" onSubmit={this.handleSubmit}>
        <i className="fab fa-instagram-square body-box-icon"></i>
        <input
          type="text"
          id="insta_link"
          onChange={this.handleChange}
          placeholder="Aggiungi un link di insta"
          className="bodyInfo-input body-box-text"
        />
        <input
          type="submit"
          className={
            this.state.insta_link && !this.state.loading
              ? "bodyInfo-submit body-box-text"
              : "hidden"
          }
          value={it.save}
        />
      </form>
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
    ) : this.props.dashboard ? (
      <form className="flex-line body-box-line" onSubmit={this.handleSubmit}>
        <i className="fab fa-facebook-square body-box-icon"></i>
        <input
          type="text"
          id="fb_link"
          onChange={this.handleChange}
          placeholder="Aggiungi il link al profilo fb"
          className="bodyInfo-input body-box-text"
        />
        <input
          type="submit"
          className={
            this.state.fb_link && !this.state.loading
              ? "bodyInfo-submit body-box-text"
              : "hidden"
          }
          value={it.save}
        />
      </form>
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
    ) : this.props.dashboard ? (
      <form className="flex-line body-box-line" onSubmit={this.handleSubmit}>
        <i className="fas fa-globe body-box-icon"></i>
        <input
          type="text"
          id="website"
          onChange={this.handleChange}
          placeholder="Aggiungi il link del tuo sito"
          className="bodyInfo-input body-box-text"
        />
        <input
          type="submit"
          className={
            this.state.website && !this.state.loading
              ? "bodyInfo-submit body-box-text"
              : "hidden"
          }
          value={it.save}
        />
      </form>
    ) : null;

    const phone = this.props.phone ? (
      <div className="flex-line body-box-line">
        <i className="fas fa-mobile body-box-icon"></i>
        <a href={`tel:${this.props.phone}`} className="body-box-text">
          {this.props.phone}
        </a>
      </div>
    ) : this.props.dashboard ? (
      <form className="flex-line body-box-line" onSubmit={this.handleSubmit}>
        <i className="fas fa-mobile body-box-icon"></i>
        <input
          type="text"
          id="phone"
          onChange={this.handleChange}
          placeholder="Aggiungi un numero di telefono"
          className="bodyInfo-input body-box-text"
        />
        <input
          type="submit"
          className={
            this.state.phone && !this.state.loading
              ? "bodyInfo-submit body-box-text"
              : "hidden"
          }
          value={it.save}
        />
      </form>
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
        <div className="flex-line" style={{ justifyContent: "space-between" }}>
          <p className="body-box-header">{it.shop_aside_info}</p>
          {this.state.loading ? (
            <div className="flex-line">
              {it.loading}
              <SmallLoading />
            </div>
          ) : null}
        </div>
        {place}
        {email}
        {category}
        {phone}
        {instagram}
        {facebook}
        {website}
      </div>
    );
  }
}

export default ShopInfo;
