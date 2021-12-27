import Cart from "../container/cart";
import Order from "../pages/order";
import Result from "../pages/result";
import Error from "../pages/error404";
import Products from "../pages/products";
import Product from "../pages/product";
type  route={
    url:string,
    component:()=>JSX.Element,
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
