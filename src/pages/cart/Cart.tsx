import React from "react";
import MinMax from "../../components/inputs/min-max/MinMax";
import store from "../../store/Cart";
import { observer } from "mobx-react";
import {Link} from "react-router-dom";
import { routesMap } from "../../routes";
import order from "../order";

function  Cart() {
  console.log(`Render cart page`);
  const productsRows = store.getOrderedProducts().map((item, index) => {
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
            count={count}
            onChange={(count: number) => store.addProduct(id, count)}
          />
        </td>
        <td className="text-center text-lg text-medium">{total}</td>
        <td className="cart__action-row ">
          <a
            className="btn btn-danger"
            href="#"
            onClick={() => store.removeProduct(id)}
          >
            Удалить
          </a>
        </td>
      </tr>
    );
  });

  return (
    <div className="container-fluid">
      <div className="padding-bottom-3x mb-1">
        <h2 className="cart_title">
          Shopping Cart
          <small> ({store.getOrderedProducts().length} item in your cart) </small>
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
                <td colSpan={5}>Итого:{store.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link
          className="btn btn-primary"
          to={routesMap.order}
        >
          Далее
        </Link>
      </div>
    </div>
  );
}

export default observer(Cart);
