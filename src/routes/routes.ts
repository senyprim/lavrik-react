import React from "react";
import Cart from "~containers/cart";
import Order from "~containers/order";
import Result from "~containers/result";
import Error from "~components/errors/error404";
import Products from "~containers/products";
import Product from "~containers/product";
type  route={
    url:string,
    component:any,
    exact?:boolean,
    name?:string
}
const routes:route[]=[
    {
        url:`/`,
        component:Products,
        exact:true,
        name:'products',
    },
  
    {
        url:`/cart`,
        component:Cart,
        exact:true,
        name:'cart',
    },
    {
        url:`/product/:id`,
        component:Product,
    },
    {
        url:`/order`,
        component:Order,
        exact:true,
        name:'order'
    },
    {
        url:`/result`,
        component:Result,
        exact:true,
        name:'result',
    },
    {
         url:`**`,
         component:Error,
    },

]
let routesMap:Record<string,string>={};
routes.forEach(it=>{
    if (it.name){
        routesMap[it.name]=it.url;
    }
})

export {routesMap};
export default routes;