import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { _isLoggedIn } from '../../utils/helper';
import { _ROUTES } from "../../constants/GlobalSetting";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route {...rest} render={props => (
      _isLoggedIn() && restricted ?
        <Redirect to={_ROUTES.PRODUCTS_LIST} />
        : <Component {...props} />
    )} />
  );
};

export default PublicRoute;