import { createStore, combineReducers, applyMiddleware } from "redux";
import {loadingReducer} from './loadingReducer'
import {shopReducer} from './shopReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
const rootReducer = combineReducers({
  loading: loadingReducer,
  shop: shopReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>