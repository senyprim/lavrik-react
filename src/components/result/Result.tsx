import React from "react";
import {User as UserType} from "~/types";
import { OrderProduct, Product } from "~/types";


export interface IProps{
  products:OrderProduct[],
  user:UserType,
  total:number,
  previousPage:()=>void,
}

const ResultScreen=(props:IProps)=>{
  const {products, user, previousPage,total:allTotal} = props;
  const productsRows = products.map((item) => {
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
      <h2>{user.name} вы заказали товара на {allTotal}</h2>
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
            <td>{allTotal}</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-danger" onClick={previousPage}>
          Назад
        </button>
        <button onClick={()=>alert('Заказано')} className="btn btn-primary">
          Далее
        </button>
    </div>
  );
}

export default ResultScreen;

