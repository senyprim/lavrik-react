export type Product = {
    id: number,
    title: string,
    price?: number,
    rest?: number,
    count: number
}
export function getTotalCostProducts(products:Product[]):number{
    return products.reduce((ac, product) => ac + product.count * (product.price??0), 0);
}

