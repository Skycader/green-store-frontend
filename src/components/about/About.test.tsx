import { render, screen } from '@testing-library/react'
import About from './About'

test('App should contain the store name', () => {
  render(<About/>)
  const storeName = screen.getByText(/green store/i)
  expect(storeName).toBeInTheDocument()
})