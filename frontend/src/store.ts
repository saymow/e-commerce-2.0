import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { shopPaginationReducer } from "./reducers/paginateReducers";
import { wishListReducer } from "./reducers/wishListReducers";
import { LOCAL_STORAGE_PREFIX, ON_SERVER } from "./utils/constants";
import { sideBarReducer } from "./reducers/sideBarReducer";
import { cartReducer } from "./reducers/cartReducers";

export const reduxStore = {
  shopPagination: shopPaginationReducer,
  wishList: wishListReducer,
  sideBar: sideBarReducer,
  cart: cartReducer,
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

  if (wishListFromStorage) initialState["wishList"] = wishListFromStorage;
  if (cartFromStorage) initialState["cart"] = cartFromStorage;
}

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
