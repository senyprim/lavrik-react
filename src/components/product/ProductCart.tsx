import React from "react";
import { Link } from "react-router-dom";
import { getProductLink } from "~/routes";
import { OrderProduct} from "~/types";

export interface IProps {
  product: OrderProduct;
  isProductInCart: boolean;
  addToCart: () => void;
  removeFromCart: () => void;
}
const ProductCart = (props: IProps) => {
  const { product, isProductInCart, addToCart, removeFromCart } =
  props;
  return (
    <div className="card" style={{ width: "250px" }}>
      
      <img
        src="https://picsum.photos/100/50"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">Цена:{product.price ?? ""}</p>
        <p className="card-text">Остаток:{product.rest}</p>
        <Link to={getProductLink(product.id)} className="btn btn-primary  mb-3">
          На станицу товара
        </Link>
        {isProductInCart ? (
          <button
            className="btn btn btn-warning"
            type="button"
            onClick={removeFromCart}
          >
            Удалить из корзины
          </button>
        ) : (
          <button className="btn btn-success" type="button" onClick={addToCart}>
            Добавить в корзину
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCart;
