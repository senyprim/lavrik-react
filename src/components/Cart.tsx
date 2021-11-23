import React from "react";
import MinMax from "./MinMax";
import { Product } from "../types";

interface IProps {
  products: Product[];
  onRemove: (index: number) => void;
  onChange: (count: number, index: number) => void;
  nextPage: ()=>void;
}

function Cart(props: IProps) {
  const {nextPage, products, onChange, onRemove } = props;

  const itog = products.reduce((ac, i) => ac + i.count * (i.price ?? 0), 0);
  const productsRows = products.map((item, index) => {
    const { id, title, price, rest = 0, count = 0 } = item;
    const total = (price ?? 0) * count;
    return (
      <tr key={id} className="cart__product-row">
        <td className="cart__product-name">
          <h4>{title}</h4>
        </td>
        <td className="text-center text-lg text-medium">{price}</td>
        <td className="cart__product-count">
          <MinMax
            min={0}
            max={rest}
            onChange={(newCount: number) => onChange(newCount, index)}
            count={count}
          />
        </td>
        <td className="text-center text-lg text-medium">{total}</td>
        <td className="cart__action-row ">
          <a
            onClick={() => onRemove(index)}
            className="btn btn-danger"
            href="#"
          >
            Удалить
          </a>
        </td>
      </tr>
    );
  });

  return (
    <div className="padding-bottom-3x mb-1">
      <h2 className="cart_title">
        Shopping Cart
        <small> ({props.products.length} item in your cart) </small>
      </h2>
      <div className="">
        <table className="table table-striped table-bordered border-primary">
          <thead>
            <tr className="cart__header-row">
              <td className="text-center">Title</td>
              <td className="text-center">Price</td>
              <td className="text-center">Count</td>
              <td className="text-center">Total</td>
              <td className="text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {productsRows}
            <tr className="cart__total-row">
              <td colSpan={5}>Итого:{itog}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary" onClick={nextPage}>
        Далее
      </button>
    </div>
  );
}

export default Cart;
