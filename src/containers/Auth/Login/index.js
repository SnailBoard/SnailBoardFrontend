import React, { useState } from 'react'
import { Button, Form, Header, Icon, Message } from 'semantic-ui-react'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { isFetchingSelector, loginStarted } from '../authSlice'

const LoginPage = () => {
  const dispatch = useDispatch()
  const isFetching = useSelector(isFetchingSelector)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)

  const setValidatedEmail = () => setIsEmailValid(validator.isEmail(email))
  const setValidatedPassword = () => setIsPasswordValid(password.length > 2)

  const onLoginClick = () => {
    if (isEmailValid && isPasswordValid) {
      const loginPayload = {
        email,
        password,
      }
      console.log('Before Logging in')
      dispatch(loginStarted(loginPayload))
      console.log('After Logging in')
    }
  }

  const onEmailChange = (e, { value }) => {
    setEmail(value)
    setValidatedEmail()
  }

  const onPasswordChange = (e, { value }) => {
    setPassword(value)
    setValidatedPassword()
  }

  return (
    <div className="mainBox">
      <Header as="h2" color="green">
        Log in
      </Header>
      <Form>
        <Form.Input
          fluid
          icon="at"
          iconPosition="left"
          placeholder="Email"
          type="email"
          error={!isEmailValid}
          onChange={onEmailChange}
          onBlur={setValidatedEmail}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          error={!isPasswordValid}
          onChange={onPasswordChange}
          onBlur={setValidatedPassword}
        />
        <Button
          type="submit"
          loading={isFetching}
          disabled={isFetching}
          onClick={() => onLoginClick()}
        >
          Login
        </Button>
      </Form>
      <Message>
        <Icon name="meh" size="big" />
        <NavLink exact to="/register" color="black">
          I DON`T HAVE AN ACCOUNT
        </NavLink>
      </Message>
    </div>
  )
}

export default LoginPage
