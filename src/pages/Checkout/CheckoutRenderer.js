import React, { Component } from "react";
import UserCheckout from "./UserCheckout";
import ShopCheckout from "./ShopCheckout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51HT5a3Bfsl1QGy9mStRueB5AbOLGlrTz6fdYRSPFsAtb5BDP5xgGjvEQBMkvSMSUO0YShbUlhouVP1sjyDOR5bD100VSv8m4NZ"
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
