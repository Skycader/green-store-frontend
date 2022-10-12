import { createStore, combineReducers } from "redux";
import {loadingReducer} from './loadingReducer'
import {shopReducer} from './shopReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
const rootReducer = combineReducers({
  loading: loadingReducer,
  shop: shopReducer,
})

export const store = createStore(rootReducer, composeWithDevTools());