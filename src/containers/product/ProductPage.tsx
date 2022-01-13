import React from "react";
import { inject,observer } from "mobx-react";
import { IGlobalStorage } from "~/models/GlobalStore";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { routesMap } from "~/routes";
import ProductPage from "~/components/product/ProductPage";
import Error404 from "~components/errors/404";

interface IdString{
    id:string
}

interface IProps extends RouteComponentProps<IdString>{
    store:IGlobalStorage;
}


const wrapperProductPage = (props:IProps)=>{
    const {store,history,match} = props;
    const idStr = match.params.id;
    let id:number = parseInt(idStr);
    id = id.toString()===idStr?id:NaN;
    const product = store.products.getProduct(id);

    if (isNaN(id) || product==null) {
        return (<Error404/>)
    }

    return (
    <ProductPage
    product= {store.cart.getOrderProduct(id)}
    isProductInCart={store.cart.isOrder(id)}
    goToHome={()=>history.push(routesMap.products)}
    addToCart={(id,count)=>store.cart.addProduct(id,count)}
    removeFromCart={(id)=>store.cart.removeProduct(id)} 
    />
    )
}

export default withRouter(inject('store')(observer(wrapperProductPage)));