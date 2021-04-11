import errorHandler from "../errorHandler";

/** Adds item from cart
 * @param id id of item in cart
 * @param type type of item in cart (pass, renewal, product)
 */
const addCartItem = async (id, type) => {
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
};

export default addCartItem;
