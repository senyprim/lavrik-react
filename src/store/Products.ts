import { Product } from "../types";
import { observable, computed, action, makeAutoObservable, makeObservable } from "mobx";


export class Products {
  @observable private _products: Map<number,Product>=new Map();
  constructor(products: Product[]) {
    products.forEach(it=>this._products.set(it.id,it));
    makeObservable(this);
  }
  @computed public get products():Product[] {
    return Array.from(this._products.values());
  }
  public getProduct=(id:number):Product|undefined=>this._products.get(id);
}
const _getProducts = () => {
  return [
      {
        id: 100,
        title: "Ipnone 200",
        price: 12000,
        rest: 10,
      },
      {
        id: 101,
        title: "Samsung AAZ8",
        price: 22000,
        rest: 5,
      },
      {
        id: 103,
        title: "Nokia 3310",
        price: 5000,
        rest: 3,
      },
      {
        id: 105,
        title: "Huawei ZZ",
        price: 15000,
        rest: 8,
      },
    ];
  };
  export default new Products(_getProducts());