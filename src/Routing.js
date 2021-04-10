import React, {useEffect} from "react";
import {connect} from "react-redux";

import {Route, Switch} from "react-router";
import PublicRoute from "./containers/PublicRoute";
import PrivateRoute from "./containers/PrivateRoute";
import HealthCheck from "./components/HealthCheck";
import LoginPage from "./containers/Auth/Login";
import RegisterPage from "./containers/Auth/Register";


const Routing = () => {

    // useEffect(() => {
    //     if (!isAuthorized) {
    //         getUser();
    //     }
    // });

    return (
        <>
            <Switch>
                <PublicRoute exact path="/health-check" component={HealthCheck}/>
                <PublicRoute exact path="/login" component={LoginPage}/>
                <PublicRoute exact path="/register" component={RegisterPage}/>
            </Switch>
        </>
    )
}

const mapStateToProps = rootState => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Routing);