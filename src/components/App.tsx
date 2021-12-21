import React from "react";
import Cart from "./Cart";
import ResultScreen from "./ResultScreen";
import { Product, User, Pages } from "../types";

import { Button } from "react-bootstrap";
import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import OrderForm from "./OrderForm";
import { EnumMember, EnumType } from "typescript";

interface IState {
  currentPage: Pages;
}

export default class extends React.Component<null, IState> {
  state = {
    currentPage: Pages.Cart,
  };
  //Обработчик сменны колличества товара
  changeProductCount = (newCount: number, index: number): void => {
    let products = [...this.state.products];
    products[index] = { ...products[index], count: newCount };
    this.setState({ products });
  };
  //Обработчик удаления товара
  removeProduct = (i: number): void => {
    let products = [...this.state.products];
    products.splice(i, 1);
    this.setState({ products });
  };
  //Обработчик смены данных пользователя
  changeUserField = (fieldName: keyof User, value: string) => {
    this.setState((state) => {
      const user = Object.assign({}, state.user, { [fieldName]: value });
      return { user };
    });
  };
  //Обработчик смены currentPage на следующую
  gotoPage = (page: Pages) => {
    this.setState({ currentPage: page });
  };
  previousPage = () => {
    this.setState((state) => {
      const countPages = Object.keys(Pages).length / 2;
      const newPage =
        state.currentPage <= 0 || state.currentPage > countPages + 1
          ? countPages - 1
          : state.currentPage - 1;
      return { currentPage: newPage };
    });
  };
  completeOrder = () => {
    alert("Заказ принят");
  };
  //Возвращает итог по товарам в корзине
  get total() {
    return this.state.products.reduce(
      (ac, i) => ac + i.count * (i.price ?? 0),
      0
    );
  }

  render = () => {
    const _getCartPage = () => (
      <div className="container-fluid">
        <Cart
          products={this.state.products}
          onChange={this.changeProductCount}
          onRemove={this.removeProduct}
          nextPage={() => this.gotoPage(Pages.UserData)}
        />
      </div>
    );
    const _getUserPage = () => (
      <OrderForm
        {...this.state.user}
        user={this.state.user}
        onChange={this.changeUserField}
        nextPage={() => this.gotoPage(Pages.Finish)}
        previousPage={() => this.gotoPage(Pages.Cart)}
      />
    );
    const _getResultPage = () => (
      <ResultScreen
        products={this.state.products}
        user={this.state.user}
        completeOrder={this.completeOrder}
        previousPage={() => this.gotoPage(Pages.UserData)}
      />
    );
    console.log(`Page=${this.state.currentPage}`);
    switch (this.state.currentPage) {
      case Pages.Cart:
        return _getCartPage();
        break;
      case Pages.UserData:
        return _getUserPage();
        break;
      case Pages.Finish:
        return _getResultPage();
        break;
    }
  };
}


};
