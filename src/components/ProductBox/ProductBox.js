import React, { Component } from "react";
import "./productBox.css";

/** Display shop marketing product
 * @param name
 * @param description
 * @param addToCart()
 * @param [images]
 */
export class ProductBox extends Component {
  state = {
    imageNav: 0
  };

  render() {
    return (
      <div id="product-box">
        <div id="product-box-image-container" className="product-box-container">
          <img
            id="product-box-image"
            src={this.props.images[this.state.imageNav]}
            alt="imagine prodotto"
          />
        </div>
        <div id="image-nav-container" className="product-box-container">
          {this.props.images.map((_, i) => (
            <i
              className={`fa${
                this.state.imageNav === i ? "s" : "r"
              } fa-circle image-nav`}
              onClick={() => this.setState({ imageNav: i })}
            ></i>
          ))}
        </div>
        <div id="product-box-info" className="product-box-container">
          <p id="product-box-name">{this.props.name}</p>
          <p id="product-box-description">
            {this.props.description.slice(0, 100)}
          </p>
        </div>
        {this.props.inCart ? (
          <p
            className="button-small button-disabled"
            id="product-box-addToCart"
            style={{ background: "green" }}
          >
            NEL CARRELLO
          </p>
        ) : (
          <p
            className="button-small"
            id="product-box-addToCart"
            onClick={() => this.props.addToCart(this.props.name)}
          >
            AGGIUNGI
          </p>
        )}
      </div>
    );
  }
}

export default ProductBox;
