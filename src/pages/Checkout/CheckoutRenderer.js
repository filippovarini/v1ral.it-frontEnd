import React, { Component } from "react";
import UserCheckout from "./UserCheckout";
import ShopCheckout from "./ShopCheckout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51IagnKBGUp477jqh6nKCs27QrEL9rAHD5Z37ODvIxUdRPExIRgpBsTIabXUrOqVOMsvW97lW1IWXsbvLqopuTBZZ00ljmmswDr"
);

/** Renders checkout page
 * @param type user / shop
 */
class Checkout extends Component {
  render() {
    return (
      <Elements stripe={stripePromise}>
        {this.props.type === "shop" ? <ShopCheckout /> : <UserCheckout />}
      </Elements>
    );
  }
}

export default Checkout;
