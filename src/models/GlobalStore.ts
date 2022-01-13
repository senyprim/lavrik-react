import User from "./User";
import Cart from "./Cart";
import Products from "./Products";
import { User as UserType,CartRecord, Product } from "../types";
import { getProducts } from "../mock/products";

export interface IGlobalStorage{
    cart:Cart,
    products:Products,
    user:User,
}
class GlobalStore implements IGlobalStorage{
    cart:Cart;
    products:Products;
    user:User;
    constructor(products:Product[], cart:Map<number, CartRecord>=new Map(), user?:UserType ){
        this.products = new Products(this,products);
        this.cart = new Cart(this,cart);
        this.user = new User(this);
    }
}

export default new GlobalStore(getProducts());