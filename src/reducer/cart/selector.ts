import { createSelector } from "reselect";
import { ErrorStorage, ErrorType } from "../../models/ErrorStorage";
import { IUserData } from "../../models/user";
import { Pages, Product } from "../../types";
import { State } from "./reducer";

export const getProducts = (state: State): Product[] => state.products;
export const getField = (state: State, fielName: keyof IUserData): string => {
  switch (fielName) {
    case "name":
      return state.name;
    case "email":
      return state.name;
    case "phone":
      return state.phone;
    default:
      throw Error(`invalid field name: ${fielName}`);
  }
};
export const getErrors = (state: State):Record<string, ErrorType[]>=> state.errors;

export const getName = (state: State): string | null => state.name;
export const getEmail = (state: State): string | null => state.email;
export const getPhone = (state: State): string | null => state.phone;
export const getConfirm = (state: State): boolean => state.confirm;
export const getCurrentPage = (state: State): Pages => state.page;
export const getUser = (state:State):IUserData=>({
  name:state.name,
  email:state.email,
  phone:state.phone
});
export const isValidUser = (state:State) => ErrorStorage.isEmpty(state.errors) && state.name && state.email && state.phone


export const getTotal = createSelector(getProducts, (products: Product[]) =>
  products.reduce((itog, it) => itog + it.count * (it.price ?? 0), 0)
);
