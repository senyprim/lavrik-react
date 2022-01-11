import React from "react";
import ResultScreen,{IProps} from "~/components/result";
import { connect } from "react-redux";
import {IState as IGlobalState} from "~reducers/index";
import { getCartWithProductData, getProducts, getTotal } from "~/reducers/products";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { getUser } from "~/reducers/user";
import { routesMap } from "~/routes";



const mapStateToProps = (state:IGlobalState,ownProps:RouteComponentProps)=>(
  Object.assign({},ownProps,
    {
      products:getCartWithProductData(state),
      user:getUser(state),
      total:getTotal(state),
      previousPage:()=>ownProps.history.push(routesMap.order),
    }
  )
)

export default withRouter(connect(mapStateToProps)(ResultScreen));