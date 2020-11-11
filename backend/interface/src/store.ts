import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userListReducer, userLoginReducer } from './reducers/userReducers';
import {
  productListReducer,
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productShowReducer,
} from './reducers/productReducers';

export const ReduxState = {
  userLogin: userLoginReducer,
  userList: userListReducer,
  productList: productListReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productShow: productShowReducer,
  productEdit: productEditReducer,
};

const reducer = combineReducers(ReduxState);

const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
