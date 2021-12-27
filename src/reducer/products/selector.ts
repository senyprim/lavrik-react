import { createSelector } from "reselect";
import { CartType } from ".";
import { Product } from "../../types";
import { IState as IGlobalState } from "../reducer";

export const getProducts = (state: IGlobalState): Product[] => state.data.products;
export const getCart = (state: IGlobalState): CartType=> state.data.cart;

export const getProductById = (state:IGlobalState,id:number)=>state.data.products.find((it)=>it.id==id);
export const isProductInCart=(state:IGlobalState,id:number):boolean=>state.data.cart.has(id);

export const getTotal = createSelector(getProducts, (products: Product[]) =>
  products.reduce((itog, it) => itog + it.count * (it.price ?? 0), 0)
);
