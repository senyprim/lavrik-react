import React from "react";
import { inject, observer } from "mobx-react";
import { IGlobalStorage } from "~/models/GlobalStore";
import  ProductCart from "~/components/product/ProductCart";

interface IProps {
  store: IGlobalStorage;
}

const wrapperProducts = (props: IProps) => {
  const { store } = props;
  const products=store.products.products

  return (
    <ul >
      {products.map((product) => {
        const id = product.id;
        return (
        <li key={id}>
          <ProductCart
            product={product}
            isProductInCart={store.cart.isOrder(id)}
            addToCart={() => store.cart.addProduct(id, 1)}
            removeFromCart={() => store.cart.removeProduct(id)}
          />
        </li>
        )
      })}
    </ul>
  );
};

export default inject("store")(observer(wrapperProducts));
