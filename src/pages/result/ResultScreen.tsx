import React from "react";
import store from "../../store/Cart";
import user from "../../store/User";
import { observer } from "mobx-react";
import { routesMap } from "../../routes";
import order from "../order";
import {Link} from "react-router-dom";

interface IProps {}

function ResultScreen() {
  const productsRows = store.getOrderedProducts().map((item, index) => {
    const { id, title, price, rest = 0, count = 0 } = item;
    const total = (price ?? 0) * count;
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
      <h2>
        {user.getField("name")} вы заказали товара на {store.total}
      </h2>
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
            <td>{store.total}</td>
          </tr>
        </tbody>
      </table>
      <Link className="btn btn-danger" to={routesMap.order}>
        Назад
      </Link>
    </div>
  );
}
export {ResultScreen};
export default observer(ResultScreen);
