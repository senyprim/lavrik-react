import { Product } from "../types";
import { observable, computed, action, makeAutoObservable, makeObservable } from "mobx";
import {IGlobalStorage} from "./GlobalStore";


export default class {
  @observable private _products: Map<number,Product>=new Map();
  globalStorage:IGlobalStorage;
  
  constructor(globalStorage:IGlobalStorage,products:Product[]=[]) {
    products.forEach(it=>this._products.set(it.id,it));
    this.globalStorage = globalStorage;
    makeObservable(this);
  }

  @action public setProducts(products:Product[]){
    products.forEach(it=>this._products.set(it.id,it));
  }

  @computed public get products():Product[] {
    return Array.from(this._products.values());
  }
  public getProduct=(id:number):Product|undefined=>this._products.get(id);

  @computed public get productInCart(){
    return (id:number)=>this.globalStorage.cart.isOrder(id);
  }
}
