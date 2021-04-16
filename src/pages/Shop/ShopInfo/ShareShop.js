import React, { Component } from "react";
import it from "../../../locales/it.json";

/** Share shop button
 * @param shopName
 */
export class ShareShop extends Component {
  render() {
    return (
      <div className="shop-aside-box box">
        <p id="share-shop-header">{it.share_shop_text}</p>
        <div id="share-shop-icons">
          <a
            id="earn-whatsapp-link"
            href={`whatsapp://send?text=${this.props.shopName} ${it.share_shop_text_whatsapp_message}${window.location.href}`}
            data-action="share/whatsapp/share"
            data-text="Take a look at this awesome website:"
          >
            <i
              id="whatsapp-icon"
              className="fab fa-whatsapp-square share-shop-icon"
            ></i>
          </a>
        </div>
      </div>
    );
  }
}

export default ShareShop;
