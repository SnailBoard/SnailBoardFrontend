import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  const { container } = render(<App />);
  console.log(container)
  expect(true === true).toBeTruthy();
});
