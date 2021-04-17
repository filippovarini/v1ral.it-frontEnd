import React, { Component } from "react";
import postImage from "../../../../functions/postImage";
import errorHandler from "../../../../functions/errorHandler";
import it from "../../../../locales/it.json";
import SmallLoading from "../../../../components/Loading/SmallLoading";

/** Renders gallery with possibility to add image
 * @param images
 * @param dashboard
 * @param zoomImage
 */
export class Gallery extends Component {
  state = {
    addImageLoading: false,
    longUrls: []
  };
  /** Saves the new image to s3 getting back an url
   * Once real url got back, it saves the new url to the db
   */
  handleImageChange = async e => {
    this.setState({ addImageLoading: true });
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function(event) {
        this.setState({
          longUrls: [...this.state.longUrls, event.target.result]
        });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
    // send request
    // post and save
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    this.setState({ multerOperating: true });
    const url = await postImage(formData);
    fetch("/shop/addImage", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ url })
    })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes);
        if (!jsonRes.success) {
          alert(jsonRes.message);
          if (jsonRes.serverError) errorHandler.serverError(jsonRes);
        }
        this.setState({ addImageLoading: false });
        window.location = window.location.pathname;
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  /** Adds images from props to images in periodic url (just added) */
  computeImages = () => {
    return this.props.images
      ? [...this.props.images, ...this.state.longUrls]
      : [];
  };

  render() {
    const addImage = this.props.dashboard ? (
      <div id="addImage-container">
        <label id="gallery-addImage-label" htmlFor="gallery-addImage">
          Aggiungi un'immagine{" "}
          <i id="gallery-add-image" className="far fa-plus-square"></i>
        </label>
        <input
          id="gallery-addImage"
          type="file"
          onChange={this.handleImageChange}
          className="hidden"
          accept="image/*"
        />
      </div>
    ) : null;

    const addImageLoading = (
      <div id="addImage-container" className="flex-line">
        <p id="gallery-addImage-label" style={{ color: "var(--gray)" }}>
          {it.loading_image_short}
        </p>
        <SmallLoading />
      </div>
    );

    return (
      <div id="shop-aside-gallery" className="shop-aside-box box">
        <div id="gallery-header" className="shop-aside-header flex-line">
          <p>{it.gallery}</p>
          {this.state.addImageLoading ? addImageLoading : addImage}
        </div>
        <div id="shop-gallery-images-container">
          {this.computeImages().map((url, i) => (
            <div
              key={i}
              className="shop-aside-image"
              onClick={() => this.props.zoomImage(i)}
              style={{ backgroundImage: `url(${url}` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

export default Gallery;
