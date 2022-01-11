import React from "react";
import "~/../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from "~components/menu";
import { MAIN_MENU_CAPTION } from "~/const";
import routes, { routesMap } from "~/routes";

interface IProps {
}

const App = (props: IProps) => {
  const links=Object.keys(MAIN_MENU_CAPTION).map(it=>({
    url:routesMap[it],
    caption: MAIN_MENU_CAPTION[it],
  }));
  const renderRoutes = routes.map((it) => (
    <Route
      path={it.url}
      component={it.component}
      exact={it.exact}
      key={it.url}
    />
  ));

  return(
    <Router>
    <div className="container">
      <div className="row">
        <div className="col-3">
       <Menu links={links} />
        </div>
        <div className="col-9">
          <Switch>
            {renderRoutes}
          </Switch>
        </div>
      </div>
    </div>
  </Router>
  )
};

export  default App;
