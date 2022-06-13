import React, { Component } from 'react';
import { Navigate, Route } from 'react-router-dom'
import isAuthenticated from './authenticate'

const PrivateRoute = ({ component: Component, ...rest }) => {
    <Route {...rest} render={props => isAuthenticated() ?
        (
            <Component {...props} />
        ) : (
            <Navigate to={{
                pathname: "/login",
                state: { from: props.location }
            }}
            />
        )}
    />
}

export default PrivateRoute