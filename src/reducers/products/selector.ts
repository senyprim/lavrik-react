import { createSelector } from "reselect";
import products, { ICartData } from "~/reducers/products";
import { Product } from "~/types";
import { IState as IGlobalState } from "~reducers/index";

export const getProducts = (state: IGlobalState): Product[] => state.data.products;
export const getCart = (state: IGlobalState): ICartData[]=> state.data.cart;
export const getProductById = (state:IGlobalState,id:number):Product|undefined=>
  state.data.products[state.data.productsIdx[id.toString()]]

export const getCartWithProductData=(state:IGlobalState):Array<Product&ICartData>=>(
  getCart(state).map(it=>{
    const product = getProductById(state,it.id);
    const cartItemWithProductData = Object.assign({},product,it);
    return cartItemWithProductData;
  }));
export const getCartItemById = (state:IGlobalState, id:number)=>
  state.data.cart.find((it)=>it.id===id);

export const isProductInCart= (state:IGlobalState,id:number)=>state.data.cart.some(it=>it.id===id);

export const getTotal = createSelector(getCartWithProductData, (cart: Array<Product&ICartData>) =>
  cart.reduce((itog, it) => itog + it.count * (it.price ?? 0), 0)
);
