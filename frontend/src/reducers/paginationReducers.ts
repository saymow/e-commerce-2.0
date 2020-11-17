import { IProduct } from "../@types";
import { PAGE_NAVIGATION_LIMIT } from "../utils/constants";

export interface ShopPaginationState {
  loading?: boolean;
  total?: number;
  currentPage?: number;
  pages?: number;
  limit: number;
  products: IProduct[];
  error?: {
    message: String;
  };
}

export type ShopPaginationAction =
  | {
      type: "SHOP-PAGINATION-SETUP";
      payload: {
        products: IProduct[];
        total: number;
        pages: number;
      };
    }
  | {
      type: "SHOP-PAGINATION-REQUEST";
    }
  | {
      type: "SHOP-PAGINATION-SUCCESS";
      payload: {
        products: IProduct[];
        currentPage: number;
      };
    }
  | {
      type: "SHOP-PAGINATION-FAIL";
      payload: {
        message: String;
      };
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
