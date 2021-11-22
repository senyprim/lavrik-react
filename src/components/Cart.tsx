import React from "react";
import PropTypes from "prop-types";
import CounterSimple from "./CounterSimple";
import { Product } from "../types";

interface IProps{
  products:Product[],
  onRemove:(index:number)=>void,
  onChange:(count:number,index:number)=>void
}

function Cart(props:IProps) {
  const { products, onChange,onRemove } = props;

  const itog= products.reduce((ac,i)=>ac+i.count*(i.price??0),0)
  const productsRows = products.map((item, index) => {
    const { id, title, price, rest=0, count=0 } = item;
    const total = (price ??0)* count;
    return (
      <tr key={id}>
        <td>{title}</td>
        <td>{price}</td>
        <td>
          <CounterSimple
            min={0}
            max={rest}
            onChange={(newCount)=>onChange(newCount,index)}
            count={count}
          />
        </td>
        <td>{total}</td>
        <td>
          <button onClick={() => onRemove(index)}>Удалить из корзины</button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Cart:</h2>
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
};


export default Cart;
