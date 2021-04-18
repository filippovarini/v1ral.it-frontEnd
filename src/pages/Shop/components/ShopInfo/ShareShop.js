import React, { Component } from "react";
import it from "../../../../locales/it.json";

/** Share shop button
 * @param shopName
 * @param dashboard
 */
export class ShareShop extends Component {
  render() {
    return (
      <div className="body-box box">
        <p id="share-shop-header">
          {this.props.dashboard
            ? it.share_shop_text_shop_owner
            : it.share_shop_text_external_user}
        </p>
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
