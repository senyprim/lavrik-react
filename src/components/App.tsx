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
  products: Product[];
  user?: User;
}

export default class extends React.Component<null, IState> {
  state = {
    currentPage: Pages.Cart,
    products: getProducts(),
    user: {},
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

const getProducts = () => {
  return [
    {
      id: 100,
      title: "Ipnone 200",
      price: 12000,
      rest: 10,
      count: 1,
    },
    {
      id: 101,
      title: "Samsung AAZ8",
      price: 22000,
      rest: 5,
      count: 2,
    },
    {
      id: 103,
      title: "Nokia 3310",
      price: 5000,
      rest: 3,
      count: 3,
    },
    {
      id: 105,
      title: "Huawei ZZ",
      price: 15000,
      rest: 8,
      count: 4,
    },
  ];
};
