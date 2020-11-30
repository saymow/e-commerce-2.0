import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { wishListReducer } from "./reducers/wishListReducers";
import { LOCAL_STORAGE_PREFIX, ON_SERVER } from "./utils/constants";
import {
  sideBarReducer,
  shopPaginationReducer,
  themeReducer,
  modalReducer,
} from "./reducers/uiReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userSessionReducer,
  userDetailsReducer,
  userConfirmationReducer,
  userEditReducer,
} from "./reducers/userReducers";

import {
  addressCreateReducer,
  addressDeleteReducer,
  addressListReducer,
} from "./reducers/addressReducers";

export const reduxStore = {
  userSession: userSessionReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userConfirmation: userConfirmationReducer,
  addressList: addressListReducer,
  addressDelete: addressDeleteReducer,
  addressCreate: addressCreateReducer,
  userEdit: userEditReducer,
  shopPagination: shopPaginationReducer,
  wishList: wishListReducer,
  sideBar: sideBarReducer,
  cart: cartReducer,
  theme: themeReducer,
  modal: modalReducer,
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
    ? JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}theme`) as string)
    : undefined;

  if (wishListFromStorage) initialState["wishList"] = wishListFromStorage;
  if (cartFromStorage) initialState["cart"] = cartFromStorage;
  if (themeFromStorage) initialState["theme"] = themeFromStorage;
}

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
