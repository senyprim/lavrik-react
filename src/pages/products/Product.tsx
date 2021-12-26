import React from "react";
import { Link } from "react-router-dom";
import { routesMap } from "../../routes";
import { Product } from "../../types";
import products from "../../store/Products";
import cart from "../../store/Cart";
import { observer } from "mobx-react";

interface IProps {}
const Products = (props: IProps) => {
  const _getProductLink = (id: number) => `/product/${id}`;
  const _renderCard = (item: Product) => {
    return (
      <div className="card" style={{ width: "250px" }}>
        <img
          src="https://picsum.photos/100/50"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <p className="card-text">Цена:{item.price ?? ""}</p>
          <p className="card-text">Остаток:{item.rest}</p>
          <Link to={_getProductLink(item.id)} className="btn btn-primary  mb-3">
            На станицу товара
          </Link>
          {cart.isOrder(item.id) ? (
            <button className="btn btn btn-warning" type="button" onClick={() => cart.removeProduct(item.id)}>
              Удалить из корзины
            </button>
          ) : (
            <button className="btn btn-success" type="button" onClick={() => cart.addProduct(item.id)}>
              Добавить в корзину
            </button>
          )}
        </div>
      </div>
    );
  };
  return (
    <ul >
      {products.products.map((it) => (
        <li key={it.id}>{_renderCard(it)}</li>
      ))}
    </ul>
  );
};
export {Products}; 
export default observer(Products);
