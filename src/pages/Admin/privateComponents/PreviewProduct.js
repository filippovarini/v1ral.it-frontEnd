import React, { Component } from "react";

import ProductBox from "../../../components/ProductBox/ProductBox";

/** Preview product
 * @param product
 * @param handleSubmit()
 * @param hide()
 */
export class PreviewProduct extends Component {
  render() {
    return (
      <div className="popUp-background" id="product-preview-wrapper">
        <div className="popUp" id="product-preview">
          <i className="fas fa-times hide-cross" onClick={this.props.hide}></i>
          <h3 style={{ marginLeft: "20px" }}>Preview prodotto</h3>
          <ProductBox dashboard={true} product={this.props.product} />
          <p
            id="preview-confirm"
            className="button-small"
            onClick={this.props.handleSubmit}
          >
            salva
          </p>
        </div>
      </div>
    );
  }
}

export default PreviewProduct;
