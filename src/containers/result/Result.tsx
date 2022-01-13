import React from "react";
import { inject, observer } from "mobx-react";
import { IGlobalStorage } from "~/models/GlobalStore";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { routesMap } from "~/routes";
import ResultScreen from "~/components/result";

interface IProps extends RouteComponentProps {
  store: IGlobalStorage;
}

const wrapperResult = (props: IProps) => {
  const { store, history } = props;
  return (
    <ResultScreen
      products={store.cart.getOrderedProducts()}
      user={store.user.getAllFields()}
      total={store.cart.total}
      previousPage={() => history.push(routesMap.order)}
    />
  );
};

export default withRouter(inject("store")(observer(wrapperResult)));
