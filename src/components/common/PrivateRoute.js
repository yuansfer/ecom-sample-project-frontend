import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { _isLoggedIn } from '../../utils/helper';
import { _ROUTES } from "../../constants/GlobalSetting";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route {...rest} render={props => (
      _isLoggedIn() ?
        <Component {...props} />
        : <Redirect to={_ROUTES.LOGIN} />
    )} />
  );
};

export default PrivateRoute;