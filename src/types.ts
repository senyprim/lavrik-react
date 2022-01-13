interface Product {
    id: number,
    title: string,
    price?: number,
    rest: number,
}
interface OrderProduct extends Product{
    count?:number;
}
export type User = {
    name :string|null,
    phone:string|null,
    email:string|null
}
export type CartRecord = {
    count:number,
}
export type ErrorType=[string,string];
export enum Pages  {Cart,UserData,Finish};
export type {Product,OrderProduct}
