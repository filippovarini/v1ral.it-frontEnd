import React, { Component } from "react";
import { Link } from "react-router-dom";
import it from "../../../locales/it.json";
import ShopWhyRegister from "../../../components/ShopRegisterConvincers/WhyShouldShopDoIt";

export class ShopPrompt extends Component {
  state = {
    whyRegisterHidden: true
  };

  toggleWhyRegister = () => {
    this.setState({ whyRegisterHidden: !this.state.whyRegisterHidden });
  };

  render() {
    return (
      <div id="shop-prompt-container" className="flex-line">
        <p id="shop-prompt-title">{it.shop_register_prompt}</p>
        <div id="shop-prompt-button-container">
          <Link
            to="/shop/register/bio"
            id="shop-prompt-button"
            className="button"
          >
            {it.shop_register_prompt_button}
          </Link>
          <p id="shop-prompt-why" onClick={this.toggleWhyRegister}>
            {it.shop_register_why_register}
          </p>
        </div>
        <ShopWhyRegister
          hidden={this.state.whyRegisterHidden}
          hide={this.toggleWhyRegister}
        />
      </div>
    );
  }
}

export default ShopPrompt;
