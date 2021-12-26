import React from "react";
import {Link} from "react-router-dom";
import {routesMap} from "../../../routes"
export default () => (
  <>
    <h1>Error 404, page not found</h1>
    <hr />
    <div className="alert alert-warning">
      <p>
        <Link to={routesMap.cart}>Go to home page</Link>
      </p>
    </div>
  </>
);
