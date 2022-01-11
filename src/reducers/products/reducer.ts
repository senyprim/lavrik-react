import { CarouselItem } from "react-bootstrap";
import {Product, PropertiesType } from "../../types";

type Action = ReturnType<PropertiesType<typeof ActionCreator>>;
type ArrayIdx={[key: string]:number};
interface ICartData {
  id:number,
  count: number,
}

interface IState {
  products: Product[];
  productsIdx:ArrayIdx
  
  cart: ICartData[];
}

const initialState: IState = {
  products: [],
  productsIdx:{},

  cart: [],
};

enum ActionType {
  LOAD_PRODUCTS = `LOAD_PRODUCTS`,
  DELETE_PRODUCT_FROM_CART = `DELETE_PRODUCT_FROM_CART`,
  ADD_PRODUCT_TO_CART = `ADD_PRODUCT_TO_CART`,
  CHANGE_COUNT_PRODUCT_IN_CART = `CHANGE_COUNT_PRODUCT_IN_CART`,
}

const ActionCreator = {
  loadProducts: (products: Product[]) =>
    ({
      type: ActionType.LOAD_PRODUCTS,
      payload: {products},
    } as const),

  deleteProduct: (idProduct: number) =>
    ({
      type: ActionType.DELETE_PRODUCT_FROM_CART,
      payload: { id: idProduct },
    } as const),

  addProductToCart: (idProduct: number, count: number) =>
    ({
      type: ActionType.ADD_PRODUCT_TO_CART,
      payload: { id: idProduct, count },
    } as const),
  
};

function reducer(state: IState = initialState, action: Action): IState {
  switch (action.type) {
   
    case ActionType.LOAD_PRODUCTS:{
      const {products} = action.payload;
      const productsIdx:ArrayIdx={};
      products.forEach((product,index)=>{
        productsIdx[product.id.toString()]=index;
      })
      return { ...state, products, productsIdx };
    }

    case ActionType.DELETE_PRODUCT_FROM_CART: {
      const {id}=action.payload;
      return { ...state, cart: state.cart.filter(it=>it.id!==id) };
    }

    case ActionType.ADD_PRODUCT_TO_CART: {
      const {id,count} = action.payload;
      const cartItem = state.cart.find(it=>it.id===id);
      
      
      //Если продукт уже есть в корзине - то меняем его иначе добавляем его
      return {
        ...state,
        cart: cartItem
        ? state.cart.map(it=>it.id===id?{id,count}:it)
        : [...state.cart,{id,count}]
      };
    }
    default:
      return state;
  }
}

export { ActionCreator };
export type { IState,ICartData };
export default reducer;
