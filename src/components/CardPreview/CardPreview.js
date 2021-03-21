import React, { Component } from "react";
import "./cardPreview.css";

import Loading from "../Loading/Loading";

/** Preview of the card
 * @param imageUrl
 * @param handleChangeUrl
 * @param username
 * @param challenger
 */
export class CardPreview extends Component {
  state = {
    url: null,
    imageLoading: false
  };

  handleImageChange = e => {
    this.setState({ imageLoading: true });
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function(event) {
        this.setState({
          url: event.target.result,
          imageLoading: false
          // submitting: false,
          // loading: false
        });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
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
          onChange={this.handleImageChange}
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
          onClick={() => this.setState({ url: null })}
        ></i>
        <img
          src={this.state.url}
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
          {this.state.imageLoading
            ? imageLoading
            : this.state.url
            ? image
            : input}
        </div>
      </div>
    );
  }
}

export default CardPreview;
