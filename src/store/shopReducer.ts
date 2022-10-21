import { applyMiddleware } from 'redux';
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

interface CLEAN_PRODUCTS {
  type: ShopActionTypes.CLEAN_PRODUCTS;
}

interface SET_BASKET {
  type: ShopActionTypes.SET_BASKET;
  payload: IBasket;
}

const defaultState: IShop = {
  products: [],
  basket: {},
};

enum ShopActionTypes {
  SET_PRODUCTS = "SET_PRODUCTS",
  CLEAN_PRODUCTS = "CLEAN_PRODUCTS",
  SET_BASKET = "SET_BASKET",
}

type ShopAction = SET_PRODUCTS | CLEAN_PRODUCTS | SET_BASKET;

export const shopReducer = (
  state = defaultState,
  action: ShopAction
): IShop => {
  console.log("!!!", "STATE: ", state, "ACTION: ", action);
  switch (action.type) {
    case ShopActionTypes.SET_PRODUCTS:
      return { ...state, products: action.payload };
    case ShopActionTypes.CLEAN_PRODUCTS:
      console.log("CLEAN")
      return { basket: state.basket, products: [] };
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
export const cleanProductsAction = () => ({
  type: ShopActionTypes.CLEAN_PRODUCTS,
});
export const setBasketAction = (payload: IBasket) => ({
  type: ShopActionTypes.SET_BASKET,
  payload,
});
