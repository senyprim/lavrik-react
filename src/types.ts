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
export function getTotalCostProducts(products:Product[]):number{
    return products.reduce((ac, product) => ac + product.count * (product.price??0), 0);
}

export  enum Pages  {Cart,UserData,Confirmation,Finish};

