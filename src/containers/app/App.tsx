import React from "react";
import { inject, observer, Provider } from "mobx-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import routes, { routesMap } from "../../routes";
import { MAIN_MENU_CAPTION } from "../../const";
import Menu from "../../components/menu";
import globalStore from "../../models/GlobalStore";
import CartButton from "~/containers/cart-button";

class App extends React.Component {
  links = Object.keys(MAIN_MENU_CAPTION).map((it) => ({
    url: routesMap[it],
    caption: MAIN_MENU_CAPTION[it],
  }));

  renderRoutes = routes.map((it) => (
    <Route
      path={it.url}
      component={it.component}
      exact={it.exact}
      key={it.url}
    />
  ));
  render() {
    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Menu links={this.links} />
            </div>

            <div className="col-9">
              <Provider store={globalStore}>
                <div className="col-auto mx-left-5">
                  <CartButton />
                </div>
                <Switch>{this.renderRoutes}</Switch>
              </Provider>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
