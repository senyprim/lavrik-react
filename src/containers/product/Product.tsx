import Product from "~components/product";
import { IProps } from "~/components/product";
import {IState as IGlobalState} from "~reducers/index";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ActionCreator, getCartItemById, getProductById, getProducts, isProductInCart } from "~/reducers/products";
import { AnyAction, Dispatch } from "redux";
import { connect } from "react-redux";
import { routesMap } from "~/routes";

interface QueryStringParts{
  id:string
}

const mapStateToProps = (state: IGlobalState, ownProps:IProps&RouteComponentProps<QueryStringParts>) =>{
  const idStr = ownProps.match.params.id;
  const id = parseInt(idStr);
  const product = getProductById(state,id);
  
  return (isNaN(id) || id.toString()!==idStr || product==null)  
  ? null
  : {
      product,
      isProductInCart:isProductInCart(state,id),
      cartItem: getCartItemById(state,id),
      goToHome:()=>ownProps.history.push(routesMap.products),
    }
}
 
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  addToCart:(id:number,count:number)=>dispatch(ActionCreator.addProductToCart(id,count)),
  removeFromCart: (id:number)=>dispatch(ActionCreator.deleteProduct(id))
})


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Product));