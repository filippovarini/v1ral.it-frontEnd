const errorHandler = {
  serverError: res => {
    console.log(res);
    alert("Server Error");
  },
  clientError: () => {
    alert("Client Error");
    window.location = "/error";
  }
};

module.exports = errorHandler;
