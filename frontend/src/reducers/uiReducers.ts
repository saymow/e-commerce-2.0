import {
  AsideBarAction,
  AsideBarState,
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
    case "SHOP-PAGINATION-SETUP":
      const { products, total, pages } = action.payload;
      return {
        ...state,
        products,
        total,
        pages,
        currentPage: 1,
        loading: false,
      };
    case "SHOP-PAGINATION-REQUEST":
      return { ...state, loading: true };
    case "SHOP-PAGINATION-SUCCESS": {
      const { products, currentPage } = action.payload;
      return { ...state, products, loading: false, currentPage };
    }
    case "SHOP-PAGINATION-FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
