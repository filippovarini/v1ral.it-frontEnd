import React, { Component } from "react";
import "./passExpireButton.css";
import it from "../../locales/it.json";
import addToCart from "../../functions/cart/add";
import Loading from "../Loading/Loading";

/** Renders button to show in ShopBox to say when the pass will expire
 * @param daysLeft days left for the pass to be valid
 * @param pricePayed price at which the user payed it
 */
export class PrivExpireButton extends Component {
  state = {
    loading: false
  };

  /** Save shop id and type = 'renewal' to cart */
  handleRenew = async () => {
    this.setState({ loading: true });
    const jsonRes = await addToCart(this.props.shopId, "renewal");
    if (!jsonRes.success) {
      alert(jsonRes.message);
    } else this.setState({ loading: false });
    window.location = window.location.pathname;
  };

  render() {
    const validPass = (
      <div className="button super-small disabled flex-line pass-expiry-button pass-expiry-wrapper">
        <p className="pass-expiry-header">{it.pass_month_duration_button}</p>
        <p id="pass-expiry-data">{this.props.daysLeft}</p>
        <p className="pass-expiry-header">{it.days}</p>
      </div>
    );

    const expiredPass = (
      <div id="pass-expired" className="pass-expiry-wrapper">
        <p id="pass-expired-text">{it.pass_expired}</p>
        <p
          className="button super-small style1 flex-line pass-expiry-button"
          onClick={this.handleRenew}
        >
          {it.pass_expired_renew_button} ({this.props.pricePayed}€)
        </p>
      </div>
    );

    const loading = (
      <div className="pass-expiry-wrapper">
        <Loading />
      </div>
    );

    const body = this.props.daysLeft <= 0 ? expiredPass : validPass;

    return this.state.loading ? loading : body;
  }
}

export default PrivExpireButton;
