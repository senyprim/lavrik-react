import React from "react";
import { Product, getTotalCostProducts } from "../types";


interface IProps{
  products:Product[]
}

function ResultScreen(props:IProps) {
  const {products} = props;
  const productsRows = products.map((item, index) => {
    const { id, title, price, rest = 0, count = 0 } = item;
    const total = (price??0) * count;
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
      <h2>ResultScreen:</h2>
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
            <td>{getTotalCostProducts(products)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ResultScreen;
