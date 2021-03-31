import errorHandler from "./errorHandler";

const goToDashboard = (redirectPath, connectedId) => {
  fetch("/transaction/dashboard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      redirectPath,
      connectedId
    })
  })
    .then(res => res.json())
    .then(jsonRes => {
      if (jsonRes.success) window.location = jsonRes.url;
      else {
        alert(jsonRes.message);
        errorHandler.serverError(jsonRes);
      }
    })
    .catch(e => {
      console.log(e);
      errorHandler.clientError();
    });
};

export default goToDashboard;
