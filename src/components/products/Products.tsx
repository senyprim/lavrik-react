import React from "react";
import { Link } from "react-router-dom";
import { Product } from "~/types";

interface IProps {
  products: Product[];
  isProductInCart: (id: number) => boolean;
  onChange: (id: number, count: number) => void;
  onRemove: (id: number) => void;
}
const Products = (props: IProps) => {
  console.log(`Render products`);
  const { products, isProductInCart, onChange, onRemove} =
    props;

  const _productUrlBuilder = (id: number) => `/product/${id}`;
  const _buttonBlock=(
    isProductInCart:boolean,
    onAdd: () => void,
    onRemove: () => void,
    )=>(
        isProductInCart ? (
            <button
              className="btn btn btn-warning"
              type="button"
              onClick={() => onRemove()}
            >
              Удалить из корзины
            </button>
          ) : (
            <button
              className="btn btn-success"
              type="button"
              onClick={() => onAdd()}
            >
              Добавить в корзину
            </button>
          )
    )
 
  const _renderCard = (
    item: Product,
    url: string,
    isProductInCart:boolean,
    onChange: (id: number, count: number) => void,
    onRemove: (id: number) => void
  ) => {
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
          <Link
            to={url}
            className="btn btn-primary  mb-3"
          >
            На станицу товара
          </Link>
          {_buttonBlock(
            isProductInCart,
            ()=>onChange(item.id,1),
            ()=>onRemove(item.id)
            )}
          
        </div>
      </div>
    );
  };
  return (
    <ul>
      {products.map((it) => (
        <li key={it.id}>
          {_renderCard(
            it,
            _productUrlBuilder(it.id),
            isProductInCart(it.id),
            onChange,
            onRemove
          )}
        </li>
      ))}
    </ul>
  );
};
export default Products;
