import { store } from "../../store";
import { setProductsAction } from "../../store/shopReducer";
import { IProduct } from "../../types/interfaces/IProduct";

test("Test dispatch SET_PRODUCTS", () => {
  const input_products = [
    {
      id: 1,
      name: "Tomato",
      count: 25,
      price: 1.15,
      image: "src",
      description: "desc",
      inBasket: 2,
    },
  ];
   
  const setProducts = (products) => {
    store.dispatch(setProductsAction(products))
  };

  setProducts((input_products))
  const products = store.getState().shop.products
  expect(products).toEqual(input_products);
});
