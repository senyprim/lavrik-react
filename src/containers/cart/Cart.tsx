import { AnyAction, Dispatch } from "redux";
import { connect } from "react-redux";
import { IState as IGlobalState } from "~reducers/index";
import { ActionCreator,  getTotal } from "~reducers/products";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { getCartWithProductData } from "~/reducers/products/";
import { routesMap } from "~/routes";
import Cart from "~/components/cart";

const mapStateToProps = (state: IGlobalState,ownProps:RouteComponentProps) => (
  Object.assign({}, ownProps, {
    cartWithProductData: getCartWithProductData(state),
    total: getTotal(state),
    goToPage: ()=>ownProps.history.push(routesMap.order)
  })
);
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    onChange: (id: number, count: number) =>
      dispatch(ActionCreator.addProductToCart(id, count)),
    onRemove: (id: number) => {
      dispatch(ActionCreator.deleteProduct(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
