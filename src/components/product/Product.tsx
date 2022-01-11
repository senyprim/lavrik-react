import React from "react";
import { ICartData } from "~/reducers/products";
import { Product as ProductType } from "~/types";
import E404 from "~components/errors/error404";
export interface IProps {
  product?: ProductType;
  isProductInCart?: boolean;
  cartItem?: ICartData;
  goToHome?: () => void;
  addToCart: (id: number, count:number) => void;
  removeFromCart: (id: number) => void;
}
const  Product = (props: IProps) => {
  const {
    product,
    isProductInCart,
    cartItem,
    goToHome,
    addToCart,
    removeFromCart,
  } = props;
  return (
    product==null
    ?<E404/>
    :(<div className="card">
      <img
        src="https://picsum.photos/100/50"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">Цена:{product.price ?? ""}</p>
        <p className="card-text">Остаток:{product.rest}</p>
         {isProductInCart ? (
          <button
            className="btn btn btn-warning"
            type="button"
            onClick={() => removeFromCart(product.id)}
          >
            Удалить из корзины
          </button>
        ) : (
          <button
            className="btn btn-success"
            type="button"
            onClick={() => addToCart(product.id,1)}
          >
            Добавить в корзину
          </button>
        )} 
      </div>
      <button type="button" onClick={goToHome}>На главную</button>
    </div>)
  );
};

export default Product;
