import { ILoadingAction } from "../types/interfaces/ILoadingAction";

interface ILoading {
  loading: boolean;
}

enum LoadingActionTypes {
  SET_LOADING = "SET_LOADING",
}

interface SET_LOADING {
  type: LoadingActionTypes.SET_LOADING;
  payload: boolean;
}
const defaultState: ILoading = {
  loading: true,
};

type LoadingAction = SET_LOADING;

export const loadingReducer = (
  state = defaultState,
  action: LoadingAction
): ILoading => {
  switch (action.type) {
    case LoadingActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const setLoadingAction = (payload: ILoading) => ({
  type: LoadingActionTypes.SET_LOADING,
  payload,
});
