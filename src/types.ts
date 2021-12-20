export type Product = {
    id: number,
    title: string,
    price?: number,
    rest?: number,
    count: number
}
export type User = {
    name :string|null,
    phone:string|null,
    email:string|null
}
export type ErrorType=[string,string];


export enum Pages  {Cart,UserData,Finish};

