import React, { Component } from "react";
import "./cardPreview.css";

import Loading from "../Loading/Loading";

/** Preview of the card
 * @param setUrl Function to set the profileUrl
 * @param username
 * @param challenger
 * @param url
 * @param imageLoading
 * @param handleImageChange
 * @param resetImage
 */
export class CardPreview extends Component {
  state = {
    url: null,
    imageLoading: false
  };

  render() {
    const input = (
      <div className="cardPreview-half">
        <label htmlFor="profileInput">
          <i id="profileInputLabel" className="fas fa-camera box profile"></i>
        </label>
        <input
          id="profileInput"
          type="file"
          onChange={this.props.handleImageChange}
          className="hidden"
          accept="image/*"
        />
      </div>
    );

    const image = (
      <div className="cardPreview-half">
        <i
          id="resetImage"
          className="fas fa-times"
          onClick={this.props.resetImage}
          style={this.props.static ? { display: "none" } : null}
        ></i>
        <img
          src={this.props.url}
          className="profile"
          alt="imagine profilo sulla carta"
        />
      </div>
    );

    const imageLoading = (
      <div className="cardPreview-half">
        <Loading />
      </div>
    );

    return (
      <div id="cardPreview">
        <p id="cardPreview-title">The Patriot Card</p>
        <div id="cardPreview-halves">
          <div id="cardPreview-texts" className="cardPreview-half">
            <div className="cardPreview-text">
              <p className="cardPreview-text-key">username:</p>
              <p className="cardPreview-text-value">{this.props.username}</p>
            </div>
            <div className="cardPreview-text">
              <p className="cardPreview-text-key">challenger:</p>
              <p className="cardPreview-text-value">{this.props.challenger}</p>
            </div>
          </div>
          {this.props.imageLoading
            ? imageLoading
            : this.props.url
            ? image
            : input}
        </div>
      </div>
    );
  }
}

export default CardPreview;
