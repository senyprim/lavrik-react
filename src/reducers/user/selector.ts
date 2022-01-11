import { createSelector } from "reselect";
import { IUserData } from "~/models/User";
import {
  ErrorRecord,
  ErrorStorage,
  ErrorType,
} from "../../models/ErrorStorage";
import { Pages, Product } from "../../types";
import { IState as IGlobalState } from "../reducer";

const getField = (state: IGlobalState, fielName: keyof IUserData): string => {
  switch (fielName) {
    case "name":
      return state.user.name;
    case "email":
      return state.user.email;
    case "phone":
      return state.user.phone;
    default:
      throw Error(`invalid field name: ${fielName}`);
  }
};
const getErrors = (state: IGlobalState): ErrorRecord => state.user.errors;

const isConfirm = (state: IGlobalState): boolean => state.user.confirm;

const getUser = (state: IGlobalState): IUserData => ({
  name: state.user.name,
  phone: state.user.phone,
  email: state.user.email,
});

const isValidUser = (state: IGlobalState) =>
  ErrorStorage.isEmpty(state.user.errors) &&
  state.user.name &&
  state.user.email &&
  state.user.phone;

export {isValidUser,getUser,isConfirm,getErrors,getField}
