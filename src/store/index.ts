import { createStore, combineReducers, applyMiddleware } from "redux";
import {loadingReducer} from './loadingReducer'
import {shopReducer} from './shopReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
const rootReducer = combineReducers({
  shop: shopReducer,
  loading: loadingReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>