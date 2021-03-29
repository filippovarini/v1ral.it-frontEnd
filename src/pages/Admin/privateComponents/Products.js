import React, { Component } from "react";

import postImage from "../../../functions/postImage";
import errorHandler from "../../../functions/errorHandler";

import ProductBox from "../../../components/ProductBox/ProductBox";
import AddProduct from "./AddProduct";
import PreviewProduct from "./PreviewProduct";
import Loading from "../../../components/Loading/Loading";

/** Renders products and functionality to add new product
 * @param products
 */
export class Products extends Component {
  state = {
    loading: false,
    adding: false,
    showingPreview: false,
    name: null,
    description: null,
    price: null,
    error: null,
    images: []
  };

  toggleAdd = () => {
    if (this.state.adding && this.validFields())
      this.setState({ showingPreview: true });
    else this.setState({ adding: true });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value, error: null });
  };

  /** Posts image to multer and then saves it to state */
  handleImageChange = async e => {
    this.setState({ loading: true, error: null });
    // send request
    // post and save
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const url = await postImage(formData);
    this.setState({ loading: false, images: [...this.state.images, url] });
  };

  /** Checks that the admin has inserted everything */
  validFields = () => {
    if (
      !this.state.name ||
      !this.state.description ||
      !this.state.price ||
      this.state.images.length <= 0
    ) {
      this.setState({ error: "Compila tutti i campi" });
      return false;
    }
    return true;
  };

  /** Deletes the product from database*/
  handleDelete = id => {
    this.setState({ loading: true });
    fetch("/admin/product", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) window.location = window.location.pathname;
        else {
          if (jsonRes.serverError) errorHandler.serverError(jsonRes);
          this.setState({ loading: false });
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  handleSubmit = () => {
    this.setState({ loading: true });
    fetch("/admin/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        product: {
          name: this.state.name,
          description: this.state.description,
          images: this.state.images,
          price: this.state.price
        }
      })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) window.location = window.location.pathname;
        else {
          if (jsonRes.serverError) errorHandler.serverError(jsonRes);
          this.setState({ loading: false });
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <div>
        <div id="add-product">
          {this.state.adding ? (
            this.state.showingPreview ? (
              <PreviewProduct
                product={{
                  name: this.state.name,
                  description: this.state.description,
                  images: this.state.images,
                  price: this.state.price
                }}
                hide={() => this.setState({ showingPreview: false })}
                handleSubmit={this.handleSubmit}
              />
            ) : (
              <AddProduct
                name={this.state.name}
                description={this.state.description}
                price={this.state.price}
                handleChange={this.handleChange}
                handleImageChange={this.handleImageChange}
                images={this.state.images}
                error={this.state.error}
              />
            )
          ) : null}

          <p
            className="button"
            id="add-product-button"
            onClick={this.toggleAdd}
          >
            {this.state.adding ? "SALVA" : "AGGIUNGI UN PRODOTTO"}
          </p>
        </div>
        <div>
          <p id="products-header">Prodotti in vendita</p>
          <div id="products-container">
            {this.props.products.map((product, i) => (
              <ProductBox
                key={i}
                product={product}
                dashboard={true}
                handleDelete={this.handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
