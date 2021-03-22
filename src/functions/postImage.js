import errorHandler from "./errorHandler";

const postImage = async body => {
  try {
    const res = await fetch("/image", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body
    });
    const jsonRes = await res.json();
    if (!jsonRes.success) errorHandler.serverError(jsonRes);
    else return jsonRes.url;
  } catch (e) {
    console.log(e);
    errorHandler.clientError();
  }
};

export default postImage;
