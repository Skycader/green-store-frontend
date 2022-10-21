import { ILoadingAction } from "../types/interfaces/ILoadingAction";

interface loading {
  loading: boolean
}
const defaultState:loading = {
  loading: true
};

const SET_LOADING = "SET_LOADING"

export const loadingReducer = (state = defaultState, action: ILoadingAction):loading => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload};
    default:
      return state;
  }
};