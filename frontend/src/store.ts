import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { shopPaginationReducer } from "./reducers/paginationReducers";

export const reduxStore = {
  shopPagination: shopPaginationReducer,
};

const reducer = combineReducers(reduxStore);

const initialState = {};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
