import React from "react";
import { Redirect, Route } from "react-router-dom";
import { checkToken } from "../utilities/checkToken";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return checkToken() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
}
export default PrivateRoute;
