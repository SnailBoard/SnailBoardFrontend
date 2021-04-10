import React, {useEffect} from 'react';


const HealthCheck = () => {
    useEffect(() => {
        fetch("/api/health-check")
            .then(response => response.text())
            .then(data => console.log("Debug response from backend via proxy: ", data))
    },[])
    return (
        <h1>Ok</h1>
    )
}


export default HealthCheck