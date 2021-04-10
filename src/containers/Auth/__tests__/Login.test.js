import React from 'react';
import { render } from '@testing-library/react';
import LoginPage from "../Login";
import {Provider} from "react-redux";
import configureStore from "../../../store";
import {BrowserRouter} from "react-router-dom";

describe('Test for LoginPage container', () => {
    const store = configureStore();
    const component = <Provider store={store}><BrowserRouter><LoginPage /></BrowserRouter></Provider>
    it('Test input field to be in container', () => {
        const { container } = render(component);
        const emailInput = container.querySelector('input[type=email]')
        expect(emailInput.textContent === "").toBeTruthy()
    })
    it('Test btn to be in container', () => {
        const { container } = render(component);
        const emailInput = container.querySelector('button[type=submit]')
        expect(emailInput.textContent === "Login").toBeTruthy()
    })
})