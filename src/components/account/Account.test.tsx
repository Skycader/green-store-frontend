import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store";
import Account from "./Account";

describe("Testing Product.tsx", () => {

beforeEach(()=>{
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Account></Account>
      </MemoryRouter>
    </Provider>
  );
})

test("Account must display Sign in button", () => {
  const storeName = screen.getByText(/Sign in/i);
  expect(storeName).toBeInTheDocument();
});

test("Product must display Create Account button", () => {
  const storeName = screen.getByText(/Create account/i);
  expect(storeName).toBeInTheDocument();
});


})

