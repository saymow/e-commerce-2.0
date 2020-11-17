import { IProduct } from "../";

export interface DefaultState {
  loading?: boolean;
  success?: boolean;
  error?: {
    message: String;
  };
}

export interface ShopPaginationState extends DefaultState {
  total?: number;
  currentPage?: number;
  pages?: number;
  limit: number;
  products: IProduct[];
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

export interface WishListState extends DefaultState {
  products: IProduct[];
}

export type WishListAction =
  | {
      type: "ADD_PRODUCT_WISHLIST";
      payload: IProduct;
    }
  | {
      type: "REMOVE_PRODUCT_WISHLIST";
      payload: {
        id: string;
      };
    };
