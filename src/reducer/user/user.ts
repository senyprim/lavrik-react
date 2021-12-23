import { UserType } from "../../types";
import { ErrorStorage, ErrorType } from "../../models/ErrorStorage";




export class User {
  private _user:UserType;
  public erros:ErrorStorage<UserType>=new ErrorStorage();
  constructor(){
  }
  public getField=(fieldName:keyof UserType):string|null=>this._user[fieldName];
  public validate=(fieldName:keyof UserType,value:string):ErrorType[]{

  }


}