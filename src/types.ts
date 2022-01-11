export type Product = {
    id: number,
    title: string,
    price?: number,
    rest: number,
}


export  enum Pages  {Cart,UserData,Confirmation,Finish};

export type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never; 
//Выбирает только текстовые свойства 
export type StringKeys<T> = { [k in keyof T]: T[k] extends string ? k : never }[keyof T];

