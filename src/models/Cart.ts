import { CartRecord, OrderProduct } from "../types";
import { observable, computed, action, makeObservable } from "mobx";
import Products from "./Products";
import {IGlobalStorage} from "./GlobalStore";


export default class {
  @observable private _products: Map<number,CartRecord>;
  globalStorage:IGlobalStorage;

  constructor(globalStorage:IGlobalStorage,products:Map<number,CartRecord>=new Map()) {
    this._products=products;
    this.globalStorage=globalStorage;
    makeObservable(this);
  }

  public getOrderedProducts=():OrderProduct[]=>
  Array.from(this._products.keys())
  .map(this.getOrderProduct)

  public getOrderProduct=(id:number):OrderProduct=>
    Object.assign({},this.globalStorage.products.getProduct(id),this._products.get(id))
  
  @action public addProduct=(id:number,count:number=1)=>{
    const product=this.globalStorage.products.getProduct(id);
    if (product==null) return ;
    count = Math.min(product.rest,Math.max(count,0));

    this._products.set(product.id,{count});
  }

  @action public removeProduct(id:number){
    this._products.delete(id);
  }
  
  @computed public get total(): number {
      return Object.values(this.getOrderedProducts())
      .reduce((ac,it)=>ac+it.count * (it?.price??0),0)
  }
  
  public isOrder=(id:number):boolean=> this._products.has(id);
}