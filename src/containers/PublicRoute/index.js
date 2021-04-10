import React from "react";
import {Redirect, Route} from "react-router";
import {connect} from "react-redux";

const PublicRoute = ({component: Component, isAuthorized,...rest}) => {
    isAuthorized = true
    return (
        <Route {...rest} render={props => (<Component {...props} />)} />
    );
};

const mapStateToProps = rootState => ({
    // isAuthorized: rootState.auth.isAuthorized
});

export default connect(mapStateToProps)(PublicRoute);