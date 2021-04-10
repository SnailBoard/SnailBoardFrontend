import React from "react";
import {Redirect, Route} from "react-router";
import {connect} from "react-redux";
import HealthCheck from "../../components/HealthCheck";

const PublicRoute = ({component: Component, isAuthorized,...rest}) => {
    return (
        <Route {...rest} render={props => (!isAuthorized ? <Component {...props} /> : <HealthCheck/>)}/>
    );
};

const mapStateToProps = rootState => ({
    isAuthorized: rootState.auth.isAuthorized
});

export default connect(mapStateToProps)(PublicRoute);