import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// components
import App from "./App";

// reducers
import UserReducer from "./reducers/UserReducer";
import ShopRegisterReducer from "./reducers/ShopRegisterReducer";

const reducers = combineReducers({
  user: UserReducer,
  shopRegister: ShopRegisterReducer
});

const store = createStore(reducers, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
