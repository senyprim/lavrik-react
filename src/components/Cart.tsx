import React from "react";
import MinMax from "./MinMax";
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
      <tr key={id} className="cart__product-row">
        <td className="cart__product-name">{title}</td>
        <td className="cart__product-price">{price}</td>
        <td className="cart__product-count">
          <MinMax 
            min={0}
            max={rest}
            onChange={(newCount:number)=>onChange(newCount,index)}
            count={count}
          />
        </td>
        <td className="cart__product-total">{total}</td>
        <td className="cart__action-row ">
          <button className="cart__action-button cart__action-button--remove" onClick={() => onRemove(index)}>Удалить из корзины</button>
        </td>
      </tr>
    );
  });

  return (
    <div className="cart">
      <h2 className="cart__header">Cart:</h2>
      <table className="cart__table">
        <tbody>
          <tr className="cart__header-row">
            <td>Title</td>
            <td>Price</td>
            <td>Count</td>
            <td>Total</td>
          </tr>
          {productsRows}
          <tr className="cart__total-row">
              <td >Итого:${itog}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};


export default Cart;
