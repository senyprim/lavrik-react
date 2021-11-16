import React from "react";
import Counter from "./Counter";

export default class extends React.Component {
  state = {
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
    this.setState({products:this._getUpdateProducts(id, { count: newCount })},()=>console.log(this.state));
  };

  remove = (id) => {
    console.log(`remove: id:${id}`);
    this.setState({products:this._getUpdateProducts(id)});
  };

  render() {
    const productsRows = this.state.products.map((item, index) => {
      const { id, title, price, rest, count } = item;
      const total = price * count;
      return (
        <tr key={`${id}:${0}:${rest}:${count}`}>
          <td>{title}</td>
          <td>{price}</td>
          <td>
            <Counter
              min={0}
              max={rest}
              onChange={(newCount) => this.change(newCount, id)}
              count={count}
            />
          </td>
          <td>{total}</td>
          <td>
            <button onClick={() => this.remove(id)}>Удалить из корзины</button>
          </td>
        </tr>
      );
    });
    const itog=this.state.products.reduce((ac,i)=>ac+i.count*i.price,0)
    return (
      <div>
        <h2>Cart</h2>
        <table>
          <tbody>
            <tr>
              <td>Title</td>
              <td>Price</td>
              <td>Count</td>
              <td>Total</td>
            </tr>
            {productsRows}
            <tr>
                <td>Итого:</td>
                <td>{itog}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
