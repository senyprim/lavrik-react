import {combineReducers} from "redux";
import data from "./products";
import user from "./user";
import {IState as IDataState} from "./products";
import {IState as IUserState} from "./user";

import NameSpace from "./name-space";
export interface IState{
  [NameSpace.DATA]: IDataState,
  [NameSpace.USER]: IUserState,
}

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
})
