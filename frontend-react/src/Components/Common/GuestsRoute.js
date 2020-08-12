import React from "react";
import { Route, Redirect } from 'react-router-dom';

export const GuestsRoute = ({component: Component, isAuthenticated, fallbackPath, ...rest}) =>
  <Route {...rest} render={props => (
    isAuthenticated ?
      <Redirect to={fallbackPath} /> :
      <Component {...props} {...rest} />
  )}/>
;
