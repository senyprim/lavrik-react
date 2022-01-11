import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Error404 from "~/components/errors/error404";

import { ActionCreator, getCartItemById, getProductById, isProductInCart } from "~/reducers/products";
import routes, { routesMap } from "~/routes";
import Product from "~components/product";
import store from "~reducers/store";

interface IProps {
  id?: string;
}

function with404Error (props: RouteComponentProps<IProps>){
    const idStr = props.match.params.id??'';
    const id:number = parseInt(idStr);
    const state = store.getState();
    
    const product = getProductById(state,id);

    if (isNaN(id) || id.toString()!==idStr || product==null) return(
      <Error404/>
    )
    
    return(
      <Product
      product={product}
      isProductInCart={isProductInCart(state,id)}
      cartItem={getCartItemById(state,id)}
      goToHome={()=>props.history.push(routesMap.product)}
      addToCart={()=>store.dispatch(ActionCreator.addProductToCart(id,1))}
      removeFromCart={()=>store.dispatch(ActionCreator.deleteProduct(id))}
      />
    )
}

export default withRouter(with404Error);
