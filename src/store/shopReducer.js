const defaultState = {
  products: [],
  basket: {},
  totalProducts: 0,
};

export const shopReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {...state, products: action.payload }
    case "SET_BASKET":
      return {...state, basket: action.payload }
    case "SET_TOTAL_PRODUCTS":
      return {...state, totalProducts: action.payload }
    default:
      return state;
  }
};