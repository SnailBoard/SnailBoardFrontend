import React from 'react'
import { useSelector } from 'react-redux'
import { isAuthorizedSelector } from '../containers/Auth/authSlice'

const HealthCheck = () => {
  const isAuthorized = useSelector(isAuthorizedSelector)

  return (
    <>
      <h1>Ok</h1>
      <h2>User is authorized: {isAuthorized.toString()}</h2>
    </>
  )
}

export default HealthCheck
