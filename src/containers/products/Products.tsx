import {IState as IGlobalState} from "~reducers/index";
import { ActionCreator, getProducts, getTotal, isProductInCart } from "~/reducers/products";
import { AnyAction, Dispatch } from "redux";
import { connect } from "react-redux";
import Products from "~/components/products";

const mapStateToProps = (state: IGlobalState) => {
    return {
      products: getProducts(state),
      total: getTotal(state),
      isProductInCart:(id:number)=>isProductInCart(state,id),
    };
  };
  const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
      onChange: (id: number, count: number) =>
        dispatch(ActionCreator.addProductToCart(id, count)),
      onRemove: (id: number) => {
        dispatch(ActionCreator.deleteProduct(id));
      },
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Products);
  