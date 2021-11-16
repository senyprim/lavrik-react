import React from "react";
import Cart from "./Cart";
import Order from "./Order";

export default class extends React.Component {
  state = {
    isOrder: false,
    products: [
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
        count: 1,
      },
      {
        id: 103,
        title: "Nokia 3310",
        price: 5000,
        rest: 2,
        count: 1,
      },
      {
        id: 105,
        title: "Huawei ZZ",
        price: 15000,
        rest: 8,
        count: 1,
      },
    ],
  };

  _getUpdateProducts = (id, updates = null) => {
    const products = this.state.products;
    const index = products.findIndex((item) => item.id === id);
    if (updates == null) {
      return [...products.slice(0, index), ...products.slice(index + 1)];
    }
    const item = updates == null ? null : { ...products[index], ...updates };
    return [...products.slice(0, index), item, ...products.slice(index + 1)];
  };

  change = (newCount, id) => {
    console.log(`change:${newCount} id:${id} count:${newCount}`);
    this.setState(
      { products: this._getUpdateProducts(id, { count: newCount }) },
      () => console.log(this.state)
    );
  };

  remove = (id) => {
    console.log(`remove: id:${id}`);
    this.setState({ products: this._getUpdateProducts(id) });
  };

  setOrder = () => {
    this.setState({ isOrder: true });
  };

  getContent = () => {
    return this.state.isOrder ? (
      <Order products={this.state.products} />
    ) : (
      <>
        <Cart
          products={this.state.products}
          onChange={this.change}
          onRemove={this.remove}
        />
        <button onClick={this.setOrder}>Заказать</button>
      </>
    );
  };

  render = () => {
    return <div>{this.getContent()}</div>;
  };
}
