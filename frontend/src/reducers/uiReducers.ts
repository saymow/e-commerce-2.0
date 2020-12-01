import {
  AsideBarAction,
  AsideBarState,
  ModalAction,
  ModalState,
  ShopPaginationAction,
  ShopPaginationState,
  ThemeAction,
  ThemeState,
} from "../@types/redux";
import { PAGE_NAVIGATION_LIMIT } from "../utils/constants";

export const sideBarReducer = (
  state: AsideBarState = {},
  action: AsideBarAction
): AsideBarState => {
  switch (action.type) {
    case "ASIDE_SHOW_CART":
      return { show: true, content: "CART_VIEW" };
    case "ASIDE_SHOW_WISHLIST":
      return { show: true, content: "WISHLIST_VIEW" };
    case "ASIDE_CLOSE":
      return {};
    default:
      return state;
  }
};

export const themeReducer = (
  state: ThemeState = { theme: "light-mode" },
  action: ThemeAction
): ThemeState => {
  switch (action.type) {
    case "SWICTH-THEME":
      const newTheme = state.theme === "dark-mode" ? "light-mode" : "dark-mode";

      return { theme: newTheme };
    default:
      return state;
  }
};

export const shopPaginationReducer = (
  state: ShopPaginationState = {
    loading: true,
    products: [],
    limit: PAGE_NAVIGATION_LIMIT,
  },
  action: ShopPaginationAction
): ShopPaginationState => {
  switch (action.type) {
    case "SHOP_PAGINATION_SETUP":
      const { products, total, pages } = action.payload;
      return {
        ...state,
        products,
        total,
        pages,
        currentPage: 1,
        loading: false,
      };
    case "SHOP_PAGINATION_REQUEST":
      return { ...state, loading: true };
    case "SHOP_PAGINATION_SUCCESS": {
      const { products, currentPage } = action.payload;
      return { ...state, products, loading: false, currentPage };
    }
    case "SHOP_PAGINATION_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

export const modalReducer = (
  state: ModalState = { open: false },
  action: ModalAction
): ModalState => {
  switch (action.type) {
    case "USER_EDIT_PROFILE":
      return { open: true, view: "USER_EDIT_PROFILE" };
    case "USER_CREATE_ADDRESS":
      return { open: true, view: "USER_CREATE_ADDRESS" };
    case "USER_EDIT_ADDRESS": {
      const entityId = action.payload.id;

      return { open: true, view: "USER_EDIT_ADDRESS", entityId };
    }
    case "CLOSE_MODAL":
      return { open: false };
    default:
      return state;
  }
};
