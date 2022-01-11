import React from "react";
import ReactDom from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./containers/app/App";
import { getProducts } from "./mock";
import { ActionCreator} from "./reducers/products";
import store from "~reducers/store";


store.dispatch(ActionCreator.loadProducts(getProducts()));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);
