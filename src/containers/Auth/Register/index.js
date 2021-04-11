import React, { useState } from 'react'
import { Button, Form, Header, Icon, Message } from 'semantic-ui-react'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { isFetchingSelector, registerStarted } from '../authSlice'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const isFetching = useSelector(isFetchingSelector)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [isUsernameValid, setUsernameValid] = useState(true)
  const [isFirstNameValid, setFirstNameValid] = useState(true)
  const [isEmailValid, setEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)

  const setValidatedFirstName = () => setFirstNameValid(firstName.length > 2)
  const setValidatedUsername = () => setUsernameValid(username.length > 2)
  const setValidatedPassword = () => setIsPasswordValid(password.length > 4)
  const setValidatedEmail = () => setEmailValid(validator.isEmail(email))

  const onRegisterClick = () => {
    if (
      isEmailValid &&
      isPasswordValid &&
      isUsernameValid &&
      isFirstNameValid
    ) {
      const registerPaylaod = {
        email,
        password,
        username,
        firstName,
      }
      dispatch(registerStarted(registerPaylaod))
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

  const onUsernameChange = (e, { value }) => {
    setUsername(value)
    setValidatedUsername()
  }

  const onFirstNameChange = (e, { value }) => {
    setFirstName(value)
    setValidatedFirstName()
  }

  return (
    <div className="mainBox">
      <Header as="h2" color="green">
        Registration
      </Header>
      <Form>
        <Form.Input
          fluid
          icon="at"
          iconPosition="left"
          placeholder="Email"
          type="email"
          value={email}
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
          value={password}
          error={!isPasswordValid}
          onChange={onPasswordChange}
          onBlur={setValidatedPassword}
        />
        <Form.Input
          fluid
          value={username}
          icon="id card"
          iconPosition="left"
          placeholder="Username"
          type="text"
          error={!isUsernameValid}
          onChange={onUsernameChange}
          onBlur={setValidatedUsername}
        />
        <Form.Input
          fluid
          value={firstName}
          icon="id card"
          iconPosition="left"
          placeholder="Firstname"
          type="text"
          error={!isFirstNameValid}
          onChange={onFirstNameChange}
          onBlur={setValidatedFirstName}
        />
        <Button
          type="submit"
          loading={isFetching}
          disabled={isFetching}
          onClick={() => onRegisterClick()}
        >
          Register
        </Button>
      </Form>
      <Message>
        <Icon name="smile" size="big" />
        <NavLink exact to="/login" color="black">
          I HAVE AN ACCOUNT
        </NavLink>
      </Message>
    </div>
  )
}

export default RegisterPage
