import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from '../Login'
import store from '../../../core/store'

describe('Test for LoginPage container', () => {
  const testComponent = (
    <Provider store={store}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </Provider>
  )

  it('Test email header to be in container', () => {
    const { container } = render(testComponent)
    const emailHeader = container.querySelector('h2')
    expect(emailHeader.textContent === 'Log In').toBeTruthy()
  })

  it('Test log in btn to be in container', () => {
    const { container } = render(testComponent)
    const emailInput = container.querySelector('button[type=submit]')
    expect(emailInput.textContent === 'Sign in').toBeTruthy()
  })
})
