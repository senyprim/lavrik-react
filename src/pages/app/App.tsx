import React from "react";
import { observer } from "mobx-react";
import { BrowserRouter  as  Router , Route, Switch } from "react-router-dom";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import history from "../../history";

import routes, { routesMap } from "../../routes";
import { MAIN_MENU_CAPTION } from "../../const";
import Menu from "../../components/menu";

@observer
class App extends React.Component {

  links=Object.keys(MAIN_MENU_CAPTION).map(it=>({
    url:routesMap[it],
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
      <Router history={history}>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Menu links={this.links} activePage={history.location.pathname}/>
            </div>
            <div className="col-9">
              <Switch>
                {this.renderRoutes}
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
