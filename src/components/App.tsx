import React from "react";
import Cart from "./Cart";
import ResultScreen from "./ResultScreen";
import { Pages } from "../types";

import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import OrderForm from "./OrderForm";
import { State } from "../reducer/cart/reducer";
import { getCurrentPage } from "../reducer/cart/selector";
import { connect } from "react-redux";

interface IProps {
  currentPage: Pages;
}

const App = (props: IProps) => {
  const { currentPage } = props;

  const _getCartPage = ():JSX.Element => (
    <div className="container-fluid">
      <Cart />
    </div>
  );
  const _getUserPage = () => <OrderForm />;
  const _getResultPage = () => <ResultScreen />;

  console.log(`Page=${currentPage}`);
  switch (currentPage) {
    case Pages.Cart:return _getCartPage();
    case Pages.UserData:return _getUserPage();
    case Pages.Finish:return _getResultPage();
    default: return (<div>404</div>);
  }
};

const mapStateToProps = (state: State, ownProps: any) =>
  Object.assign({}, ownProps, {
    currentPage: getCurrentPage(state),
  });
export { App };
export default connect(mapStateToProps,null)(App);
