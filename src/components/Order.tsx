import React from "react";
import PropTypes from "prop-types";
import { Product } from "../types";

Order.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rest: PropTypes.number,
      count: PropTypes.number,
    })
  ),
};
interface IProps{
  products:Product[]
}

function Order(props:IProps) {
  const {products} = props;
  const itog = products.reduce((ac, i) => ac + i.count * i.price, 0);
  const productsRows = products.map((item, index) => {
    const { id, title, price, rest = 0, count = 0 } = item;
    const total = price * count;
    return (
      <tr key={`${id}:${0}:${rest}:${count}`}>
        <td>{title}</td>
        <td>{price}</td>
        <td>{count}</td>
        <td>{total}</td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Order:</h2>
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

export default Order;
