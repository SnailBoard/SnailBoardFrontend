import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux";

const PrivateRoute = ({component: Component, isAuthorized,...rest}) => {
    return (
        <Route {...rest} render={props => (
            isAuthorized ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

const mapStateToProps = rootState => ({
    isAuthorized: rootState.auth.isAuthorized
});

export default connect(mapStateToProps)(PrivateRoute);