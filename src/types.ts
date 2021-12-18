export type Product = {
    id: number,
    title: string,
    price?: number,
    rest?: number,
    count: number
}
export type User = {
    name?:string,
    phone?:string,
    email?:string
}
export enum Pages  {Cart,UserData,Finish};

