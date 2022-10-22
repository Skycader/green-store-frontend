import { render, screen } from '@testing-library/react'
import App from './App'

test('App should contain the store name', () => {
  render(<App/>)
  const storeName = screen.getByText(/green-store/i)
  expect(storeName).toBeInTheDocument()
})