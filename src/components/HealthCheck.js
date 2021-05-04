import React from 'react'
import { useSelector } from 'react-redux'
import {
  userSelector,
  isAuthorizedSelector,
} from '../containers/Auth/authSlice'

const HealthCheck = () => {
  const isAuthorized = useSelector(isAuthorizedSelector)
  const data = useSelector(userSelector)
  return (
    <>
      <h1>Ok</h1>
      <h2>User is authorized: {isAuthorized.toString()}</h2>
      {data && (
        <div>
          <h2>First name {data.firstName}</h2>
        </div>
      )}
    </>
  )
}

export default HealthCheck
