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

  it('Test input field to be in container', () => {
    const { container } = render(testComponent)
    const emailInput = container.querySelector('input[type=email]')
    expect(emailInput.textContent === '').toBeTruthy()
  })

  it('Test btn to be in container', () => {
    const { container } = render(testComponent)
    const emailInput = container.querySelector('button[type=submit]')
    expect(emailInput.textContent === 'Login').toBeTruthy()
  })
})
