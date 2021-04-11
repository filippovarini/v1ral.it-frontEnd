import React, { Component } from "react";
import "./productBox.css";
import addToCart from "../../functions/cart/add";
import Loading from "../Loading/Loading";

/** Display shop marketing product
 * @param product
 * @param dashbaord If the product is rendered in the dashboard (the 'add to
 * cart' should be disabled)
 * @param handleDelete() Function to delete the product
 */
export class ProductBox extends Component {
  state = {
    imageNav: 0,
    boxLoading: false,
    added: false
  };

  addToCart = async () => {
    this.setState({ boxLoading: true });
    const jsonRes = await addToCart(this.props.product.id, "product");
    if (jsonRes.success) {
      this.setState({ added: true });
    } else {
      alert(jsonRes.message);
    }
    this.setState({ boxLoading: false });
  };

  render() {
    return (
      <div id="product-box">
        {this.state.boxLoading ? (
          <Loading />
        ) : this.props.product ? (
          <div>
            {" "}
            <div
              id="product-box-image-container"
              className="product-box-container"
            >
              <img
                id="product-box-image"
                src={this.props.product.images[this.state.imageNav]}
                alt="imagine prodotto"
              />
            </div>
            <div id="image-nav-container" className="product-box-container">
              {this.props.product.images.map((_, i) => (
                <i
                  key={i}
                  className={`fa${
                    this.state.imageNav === i ? "s" : "r"
                  } fa-circle image-nav`}
                  onClick={() => this.setState({ imageNav: i })}
                ></i>
              ))}
            </div>
            <div id="product-box-info" className="product-box-container">
              <p id="product-box-name">{this.props.product.name}</p>
              <p id="product-box-description">
                {this.props.product.description.slice(0, 100)}
              </p>
            </div>
            {this.props.dashboard ? (
              <p
                className="button small disabled"
                id="product-box-addToCart"
                style={{ background: "green" }}
              >
                {this.props.product.price} €
              </p>
            ) : this.props.product.added || this.state.added ? (
              <p
                className="button small disabled"
                id="product-box-addToCart"
                style={{ background: "green" }}
              >
                NEL CARRELLO
              </p>
            ) : (
              <p
                className="button small"
                id="product-box-addToCart"
                onClick={this.addToCart}
              >
                {this.props.product.price} €
              </p>
            )}
            {this.props.handleDelete ? (
              <i
                id="delete-product"
                className="fas fa-trash-alt hide-cross"
                onClick={() => this.props.handleDelete(this.props.product.id)}
              ></i>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default ProductBox;
