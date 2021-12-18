import React from "react";
import router from '../store/Router';
import {observer} from "mobx-react";

import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css";

@observer class App extends React.Component {

  render() {
    console.log('App render');
   
    return (
      <div>
        {router.getComponent()}
      </div>
    );
  };
}

export default App;