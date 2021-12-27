import {Product, PropertiesType } from "../../types";

type Action = ReturnType<PropertiesType<typeof ActionCreator>>;
interface ICartData {
  count: number;
}
type CartType = Map<number,ICartData>;
interface IState {
  products: Product[];
  cart: Map<number, ICartData>;
}

const initialState: IState = {
  products: [],
  cart: new Map(),
};

enum ActionType {
  LOAD_PRODUCTS = `LOAD_PRODUCTS`,
  DELETE_PRODUCT_FROM_CART = `DELETE_PRODUCT_FROM_CART`,
  ADD_PRODUCT_TO_CART = `ADD_PRODUCT_TO_CART`,
}

const ActionCreator = {
  loadProducts: (products: Product[]) =>
    ({
      type: ActionType.LOAD_PRODUCTS,
      payload: products,
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
    case ActionType.LOAD_PRODUCTS:
      return { ...state, products: action.payload };

    case ActionType.DELETE_PRODUCT_FROM_CART: {
      const newCart = new Map(state.cart);
      newCart.delete(action.payload.id);
      return { ...state, cart: newCart };
    }

    case ActionType.ADD_PRODUCT_TO_CART: {
      const newCart = new Map(state.cart);
      newCart.set(action.payload.id,{count:action.payload.count});
      return {
        ...state,
        cart: newCart,
      };
    }
    default:
      return state;
  }
}

export { ActionCreator };
export type { IState,CartType };
export default reducer;
