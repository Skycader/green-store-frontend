const defaultState = {
  loading: true
};

export const loadingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};