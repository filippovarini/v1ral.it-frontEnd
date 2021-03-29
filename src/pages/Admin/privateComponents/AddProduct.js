import React, { Component } from "react";

/** Form to add new product
 * @param handleChange
 * @param images
 * @param handleImageChange
 * @param error
 */
export class AddProduct extends Component {
  render() {
    return (
      <div id="product-form" className="flex-col">
        <label htmlFor="image" className="box">
          <i className="fas fa-camera"></i>
          <i className="fas fa-plus"></i>
        </label>
        <input
          id="image"
          type="file"
          onChange={this.props.handleImageChange}
          className="hidden"
          accept="image/*"
        />
        <div id="product-form-url-container">
          {this.props.images.map((image, i) => (
            <p key={i} className="product-form-url">
              {image}
            </p>
          ))}
        </div>
        <input
          type="text"
          placeholder="nome prodotto"
          onChange={this.props.handleChange}
          id="name"
          value={this.props.name}
          className="product-form-input"
        />
        <textarea
          type="text"
          placeholder="descrizione"
          onChange={this.props.handleChange}
          value={this.props.description}
          id="description"
          className="product-form-input"
        ></textarea>
        <input
          type="number"
          placeholder="prezzo"
          onChange={this.props.handleChange}
          value={this.props.price}
          id="price"
          className="product-form-input"
        />
        <p className="form-error">{this.props.error}</p>
      </div>
    );
  }
}

export default AddProduct;
