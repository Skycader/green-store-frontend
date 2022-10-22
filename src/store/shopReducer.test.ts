import { useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { setProductsAction } from "./shopReducer";

describe("Testing SET_PRODUCTS action creator", () => {
  test("SET_PRODUCTS MUST RETURN PRODUCTS", () => {
    expect(
      setProductsAction([
        {
          id: 1,
          name: "Tomato",
          count: 25,
          price: 1.15,
          image: "src",
          description: "desc",
          inBasket: 2,
        },
      ])
    ).toEqual({
      type: "SET_PRODUCTS",
      payload: [
        {
          id: 1,
          name: "Tomato",
          count: 25,
          price: 1.15,
          image: "src",
          description: "desc",
          inBasket: 2,
        },
      ],
    });
  });

});
