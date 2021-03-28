import React, { Component } from "react";

import ProductBox from "../../../components/ProductBox/ProductBox";

/** Renders products and functionality to add new product
 * @param products
 */
export class Products extends Component {
  render() {
    return (
      <div>
        <div id="add-product">
          <div id="product-form"></div>
          <p className="button" id="add-product-button">
            AGGIUNGI UN PRODOTTO
          </p>
        </div>
        <div>
          <p id="products-header">Prodotti in vendita</p>
          <div id="products-container">
            {this.props.products.map((product, i) => (
              <ProductBox product={product} disabled={true} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
