import errorHandler from "./errorHandler";

/** Cart object with functions to add and remove item from cart in backend */
const Cart = {
  /** Adds item from cart
   * @param id id of item in cart
   * @param type type of item in cart (pass, renewal, product)
   */
  post: async (id, type) => {
    try {
      const res = await fetch("/transaction/cart", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          item: { id, type }
        })
      });
      const jsonRes = await res.json();
      if (jsonRes.serverError) errorHandler.serverError(jsonRes);
      return jsonRes;
    } catch (e) {
      console.log(e);
      errorHandler.clientError();
    }
  },
  /** Removes item from cart
   * @param id id of item in cart
   * @param type type of item in cart (pass, renewal, product)
   */
  delete: async (id, type) => {
    try {
      const res = await fetch("/transaction/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ item: { id, type } })
      });
      const jsonRes = await res.json();
      if (jsonRes.serverError) errorHandler.serverError(jsonRes);
      return jsonRes;
    } catch (e) {
      console.log(e);
      errorHandler.clientError();
    }
  }
};

export default Cart;
