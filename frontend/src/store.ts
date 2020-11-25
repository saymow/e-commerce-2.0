import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { wishListReducer } from "./reducers/wishListReducers";
import { LOCAL_STORAGE_PREFIX, ON_SERVER } from "./utils/constants";
import {
  sideBarReducer,
  shopPaginationReducer,
  themeReducer,
} from "./reducers/uiReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userSessionReducer,
  userDetailsReducer,
  userConfirmationReducer,
} from "./reducers/userReducers";

export const reduxStore = {
  userSession: userSessionReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userConfirmation: userConfirmationReducer,
  shopPagination: shopPaginationReducer,
  wishList: wishListReducer,
  sideBar: sideBarReducer,
  cart: cartReducer,
  theme: themeReducer,
};

const reducer = combineReducers(reduxStore);

const initialState: Record<any, any> = {};

if (!ON_SERVER) {
  const wishListFromStorage = localStorage.getItem(
    `${LOCAL_STORAGE_PREFIX}wishList`
  )
    ? JSON.parse(
        localStorage.getItem(`${LOCAL_STORAGE_PREFIX}wishList`) as string
      )
    : undefined;

  const cartFromStorage = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}cart`)
    ? JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}cart`) as string)
    : undefined;

  const themeFromStorage = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}theme`)
    ? localStorage.getItem(`${LOCAL_STORAGE_PREFIX}theme`)
    : undefined;

  if (wishListFromStorage) initialState["wishList"] = wishListFromStorage;
  if (cartFromStorage) initialState["cart"] = cartFromStorage;
  if (themeFromStorage) initialState["theme"] = cartFromStorage;
}

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
