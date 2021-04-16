import React, { Component } from "react";
import it from "../../../locales/it.json";

export class ShareShop extends Component {
  render() {
    return (
      <div className="shop-aside-box box">
        <p id="share-shop-header">{it.share_shop_text}</p>
        <div id="share-shop-icons">
          <i
            id="whatsapp-icon"
            className="fab fa-whatsapp-square share-shop-icon"
          ></i>
        </div>
      </div>
    );
  }
}

export default ShareShop;
