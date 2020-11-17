import { PAGE_NAVIGATION_LIMIT } from "../utils/constants";

import { ShopPaginationAction, ShopPaginationState } from "../@types/redux";

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
