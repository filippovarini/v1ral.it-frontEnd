import errorHandler from "../errorHandler";

/** Removes item from cart
 * @param id id of item in cart
 * @param type type of item in cart (pass, renewal, product)
 */
const removeCartItem = async (id, type) => {
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
    return jsonRes;
  } catch (e) {
    console.log(e);
    errorHandler.clientError();
  }
};

export default removeCartItem;
