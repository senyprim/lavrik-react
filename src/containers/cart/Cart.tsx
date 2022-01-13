import React from "react";
import { inject,observer } from "mobx-react";
import { IGlobalStorage } from "~/models/GlobalStore";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { routesMap } from "~/routes";
import Cart from "~/components/cart";

interface IProps extends RouteComponentProps<any>{
    store:IGlobalStorage;
}

const wrapperCart = (props:IProps)=>{
    const {store,history} = props;
    return (
    <Cart
    cartWithProductData={store.cart.getOrderedProducts()}
    total={store.cart.total}
    onRemove={(id:number)=>store.cart.removeProduct(id)}
    onChange={(id:number,count:number)=>store.cart.addProduct(id,count)} 
    goToPage={()=>history.push(routesMap.order)}
    />
    )
}


export default withRouter(inject('store')(observer(wrapperCart)));
