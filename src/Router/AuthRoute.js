import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import checkToken from '../utilities/checkToken'

function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return checkToken() === null ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }}
    />
  );
}
export default AuthRoute;