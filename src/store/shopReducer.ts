import { IProduct } from "../types/interfaces/IProduct";

interface IShop {
  products: IProduct[];
  basket: IBasket;
}

interface IBasket {
  [name: number]: number;
}

interface SET_PRODUCTS {
  type: ShopActionTypes.SET_PRODUCTS;
  payload: IProduct[];
}

interface SET_BASKET {
  type: ShopActionTypes.SET_BASKET
  payload: IBasket
}

const defaultState: IShop = {
  products: [],
  basket: {},
};

enum ShopActionTypes {
  SET_PRODUCTS = "SET_PRODUCTS",
  SET_BASKET = "SET_BASKET",
}

type ShopAction = SET_PRODUCTS | SET_BASKET

export const shopReducer = (
  state = defaultState,
  action: ShopAction
): IShop => {
  switch (action.type) {
    case ShopActionTypes.SET_PRODUCTS:
      return { ...state, products: action.payload };
    case ShopActionTypes.SET_BASKET:
      return { ...state, basket: action.payload };
    default:
      return state;
  }
};

export const setProductsAction = (payload: IProduct[]) => ({
  type: ShopActionTypes.SET_PRODUCTS,
  payload,
});
export const setBasketAction = (payload: IBasket) => ({
  type: ShopActionTypes.SET_BASKET,
  payload,
});