import { Product } from "../types";
import { observable, computed, action, makeAutoObservable, makeObservable } from "mobx";

export class Cart {
  @observable private _products: Product[];
  constructor(products: Product[]) {
    this._products = products;
    makeObservable(this);
  }

  getValidCount(index:number,count:number){
    
  }

  @computed public get total(): number {
      return this._products.reduce((ac,it)=>ac+it.count * (it?.price??0),0)
  }
  @action public changeCont(index:number,count:number){
      
      this._products[index].count=count;
  }
  @action public remove(i:number){
    this._products.splice(i,1);
  }
  @computed public get products():Product[] {
    return [...this._products];
  }
}

const _getProducts = () => {
  return [
      {
        id: 100,
        title: "Ipnone 200",
        price: 12000,
        rest: 10,
        count: 1,
      },
      {
        id: 101,
        title: "Samsung AAZ8",
        price: 22000,
        rest: 5,
        count: 2,
      },
      {
        id: 103,
        title: "Nokia 3310",
        price: 5000,
        rest: 3,
        count: 3,
      },
      {
        id: 105,
        title: "Huawei ZZ",
        price: 15000,
        rest: 8,
        count: 4,
      },
    ];
  };
  export default new Cart(_getProducts());