import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
// import isAuthenticated from './authenticate';

const PrivateRoute = ({ Component, ...rest }) => {
    const auth = useSelector((state) => state.auth)
    const { isAuthenticated } = auth;
    console.log("PrivateRoute: " + isAuthenticated)

    return (
        <Route {...rest} render={props => isAuthenticated === true ?
            (
                <Component {...props} />
            ) : (
                <Redirect to='/login'
                />
            )}
        />
    )
};


PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(PrivateRoute)