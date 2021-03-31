import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardElement";

/** Form for checkout
 * @param client_secret
 * @param billing_details
 * @param saveTransaction
 * @param toggleLoading
 */
export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorDisplay, setErrorDisplay] = useState(null);

  const handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    props.toggleLoading();

    if (!stripe || !elements) {
      setErrorDisplay(
        "Qualcosa è andato storto nel setup del pagamento. Non ti preoccupare, non hai perso soldi. Ricarica la pagina e prova di nuovo. Se il problema persiste, non esitare a contattarci"
      );
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(props.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: props.billing_details
      }
    });

    if (result.error) {
      setErrorDisplay(result.error.message);
      props.toggleLoading();
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") props.saveTransaction();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <p className="form-error">{errorDisplay}</p>
      <button
        style={{ marginTop: "20px" }}
        className="button checkout-button"
        disabled={!stripe}
      >
        conferma
      </button>
    </form>
  );
}
