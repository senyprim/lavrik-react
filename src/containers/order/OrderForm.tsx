import { connect } from "react-redux";
import { RouteComponentProps, RouteProps, withRouter } from "react-router-dom";
import { AnyAction, Dispatch } from "redux";
import { IUserData } from "~/models/User";
import {
  ActionCreator,
  getErrors,
  getUser,
  isConfirm,
  isValidUser,
} from "~/reducers/user";
import { routesMap } from "~/routes";
import OrderForm from "~components/order";
import {IProps} from "~components/order";
import { IState as IGlobalState } from "~reducers/index";



const mapStateToProps = (state: IGlobalState, ownProps:IProps&RouteComponentProps) =>
  Object.assign({}, ownProps, {
    user: getUser(state),
    confirm: isConfirm(state),
    errors: getErrors(state),
    isValidUser: isValidUser(state),
    nextPage: () => ownProps.history.push(routesMap.result),
    previousPage: () => ownProps.history.push(routesMap.cart),
  });
const mapDispatchFromProps = (dispatch: Dispatch<AnyAction>) => ({
  changeUser: (field: keyof IUserData, value: string) =>
    dispatch(ActionCreator.setField(field, value)),
  setConfirm: (confirm:boolean)=>dispatch(ActionCreator.setConfirm(confirm)),
});

export default withRouter(connect(mapStateToProps,mapDispatchFromProps)(OrderForm));