import { Product } from "./types";

export const getProducts = ():Product[] => {
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
}
