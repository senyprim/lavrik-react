import { Pages, Product, PropertiesType } from "../../types";
import { ErrorStorage, ErrorType } from "../../models/ErrorStorage";
import User, { IUserData } from "../../models/user";

type Action = ReturnType<PropertiesType<typeof ActionCreator>>;

interface State {
  name: string;
  email: string;
  phone: string;
  confirm: boolean;
  products: Product[];
  page: Pages;
  errors: Record<string, ErrorType[]>;
}

const initialState: State = {
  name: ``,
  email: ``,
  phone: ``,
  confirm: false,
  products: [],
  page: Pages.Cart,
  errors: {},
};

enum ActionType {
  LOAD_PRODUCTS = `LOAD_PRODUCTS`,
  SET_NAME = `SET_NAME`,
  SET_EMAIL = `SET_EMAIL`,
  SET_PHONE = `SET_PHONE`,
  SET_CONFIRM = `SET_CONFIRM`,
  DELETE_PRODUCT = `DELETE_PRODUCT`,
  CHANGE_COUNT = `CHANGE_COUNT`,
  GO_TO_PAGE = `GO_TO_PAGE`,
  SET_ERRORS = `SET_ERRORS`,
  SET_FIELD = `SET_FIELD`,
}

const ActionCreator = {
  loadProducts: (products: Product[]) =>
    ({
      type: ActionType.LOAD_PRODUCTS,
      payload: products,
    } as const),
  setfield: (fieldName: keyof IUserData, value: string) =>
    ({
      type: ActionType.SET_FIELD,
      payload: {
        fieldName,
        value,
        newErrors: User.validate(fieldName, value),
      },
    } as const),

  setConfirm: (confirm: boolean) =>
    ({
      type: ActionType.SET_CONFIRM,
      payload: confirm,
    } as const),
  deleteProduct: (idProduct: number) =>
    ({
      type: ActionType.DELETE_PRODUCT,
      payload: idProduct,
    } as const),
  changeCountProduct: (idProduct: number, count: number) =>
    ({
      type: ActionType.CHANGE_COUNT,
      payload: { id: idProduct, count },
    } as const),
  goToPage: (page: Pages) =>
    ({
      type: ActionType.GO_TO_PAGE,
      payload: page,
    } as const),
};

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionType.LOAD_PRODUCTS:
      return { ...state, products: action.payload };
    case ActionType.SET_FIELD: {
      const { fieldName, value, newErrors } = action.payload;
      const stateValue = { [fieldName]: value };
      const errors = ErrorStorage.setErrorsTo(
        state.errors,
        fieldName,
        newErrors
      );
      return { ...state, ...stateValue, errors };
    }
    case ActionType.GO_TO_PAGE:
      return { ...state, page: action.payload };
    case ActionType.SET_CONFIRM:
      return { ...state, confirm: action.payload };
    case ActionType.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((it) => it.id != action.payload),
      };
    case ActionType.CHANGE_COUNT:
      return {
        ...state,
        products: state.products.map((it) =>
          it.id === action.payload.id
            ? { ...it, count: action.payload.count }
            : it
        ),
      };
    default:
      return state;
  }
}

export { reducer, ActionCreator };
export type { State };
