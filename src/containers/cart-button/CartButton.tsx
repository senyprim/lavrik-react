import React from "react";
import { inject, observer } from "mobx-react";
import { IGlobalStorage } from "~/models/GlobalStore";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { routesMap } from "~/routes";
import CartButton from "~/components/cart-button/CartButton";

interface IProps extends RouteComponentProps {
  store: IGlobalStorage;
}

const wrapperCartButton = (props: IProps) => {
  const { store, history } = props;
  return (
    <CartButton
    count={store.cart.orderedProducts.length}
    total={store.cart.total}
    name={store.user.getField('name')} 
    onClick={()=>history.push(routesMap.cart)}
    />
  );
};

export default withRouter(inject("store")(observer(wrapperCartButton)));
