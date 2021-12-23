export type Product = {
    id: number,
    title: string,
    price?: number,
    rest: number,
    count: number
}
export type UserType = {
    name :string|null,
    phone:string|null,
    email:string|null
}
export function getTotalCostProducts(products:Product[]):number{
    return products.reduce((ac, product) => ac + product.count * (product.price??0), 0);
}

export  enum Pages  {Cart,UserData,Confirmation,Finish};

export type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never; 
//Выбирает только текстовые свойства 
export type StringKeys<T> = { [k in keyof T]: T[k] extends string ? k : never }[keyof T];

