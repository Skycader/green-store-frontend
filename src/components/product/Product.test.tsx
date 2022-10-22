import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store";
import Product from "./Product";

describe("Testing Product.tsx", () => {

beforeEach(()=>{
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Product></Product>
      </MemoryRouter>
    </Provider>
  );
})

test("Product must display price", () => {
  const storeName = screen.getByText(/\$/i);
  expect(storeName).toBeInTheDocument();
});

test("Product must display available KGs", () => {
  const storeName = screen.getByText(/KG/i);
  expect(storeName).toBeInTheDocument();
});


})

