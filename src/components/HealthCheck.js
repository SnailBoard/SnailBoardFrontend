import React from 'react';
import {connect} from "react-redux";


const HealthCheck = (props) => {
    const { isAuthorized } = props
    console.log(isAuthorized)

    return (
        <>
            <h1>Ok</h1>
            <h2>User is authorized: {isAuthorized.toString()}</h2>
        </>
    )
}

const mapStateToProps = rootState => ({
    isAuthorized: rootState.auth.isAuthorized
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthCheck);
