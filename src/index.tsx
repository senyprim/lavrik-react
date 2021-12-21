import React from "react";
import ReactDom from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./components/App";
import { getProducts } from "./mock";
import { ActionCreator, reducer } from "./reducer/cart/cart";

const store = createStore(reducer);
store.dispatch(ActionCreator.loadProducts(getProducts()));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);
