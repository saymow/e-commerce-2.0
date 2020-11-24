import { IProduct } from "../";

export interface DefaultState {
  loading?: boolean;
  success?: boolean;
  error?: {
    message: String;
  };
  reset?: () => { type: string };
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

export interface AsideBarState {
  show?: boolean;
  content?: "WISHLIST_VIEW" | "CART_VIEW";
}

export type AsideBarAction =
  | {
      type: "ASIDE_SHOW_WISHLIST";
    }
  | {
      type: "ASIDE_SHOW_CART";
    }
  | {
      type: "ASIDE_CLOSE";
    };

export interface CartProduct extends IProduct {
  qty: number;
}

interface Address {
  street: string;
  neighborhood: string;
  postalCode: string;
  location: {
    city: string;
    state: string;
  };
}

export interface CartState {
  subtotal: number;
  shippingCost: number;
  total: number;
  products: CartProduct[];
  address?: Address;
}

export type CartAction =
  | {
      type: "ADD_PRODUCT_CART";
      payload: IProduct;
    }
  | {
      type: "REMOVE_PRODUCT_CART";
      payload: {
        id: string;
        force?: boolean;
      };
    }
  | { type: "UPDATE_TOTAL_CART" }
  | {
      type: "RESET_CART";
    };

export interface ThemeState {
  theme: "dark-mode" | "light-mode";
}

export type ThemeAction = {
  type: "SWICTH-THEME";
};

export interface SessionState extends DefaultState {
  user?: {
    name: string;
    email: string;
  };
  auth?: boolean;
}

export type SessionAction =
  | {
      type: "SESSION-REQUEST";
    }
  | {
      type: "SESSION-SUCCESS";
      payload: {
        name: string;
        email: string;
      };
    }
  | {
      type: "SESSION-FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "SESSION-LOGOUT" };

export interface LoginState extends DefaultState {
  user?: {
    name: string;
    email: string;
  };
}

export type LoginAction =
  | {
      type: "USER_LOGIN-REQUEST";
    }
  | {
      type: "USER_LOGIN-SUCCESS";
      payload: {
        name: string;
        email: string;
      };
    }
  | {
      type: "USER_LOGIN-FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_LOGIN-RESET" };
