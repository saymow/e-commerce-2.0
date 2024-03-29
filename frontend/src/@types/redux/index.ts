import { IProduct } from "../";
import { Address, FetchedAddress, GivenAddress } from "./address";
import { ShipmentData } from "./checkout";

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
      type: "SHOP_PAGINATION_SETUP";
      payload: {
        products: IProduct[];
        total: number;
        pages: number;
      };
    }
  | {
      type: "SHOP_PAGINATION_REQUEST";
    }
  | {
      type: "SHOP_PAGINATION_SUCCESS";
      payload: {
        products: IProduct[];
        currentPage: number;
      };
    }
  | {
      type: "SHOP_PAGINATION_FAIL";
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

export interface CartState {
  total: number;
  shippingCost: number;
  subtotal: number;
  products: CartProduct[];
  locked: boolean;
  checkoutId?: string;
  shipmentMethod?: ShipmentData;
  shipmentAddress?: FetchedAddress | Address;
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
    }
  | { type: "ADD_SHIPMENT_METHOD_CART"; payload: ShipmentData }
  | { type: "ADD_ADDRESS_CART"; payload: FetchedAddress }
  | {
      type: "SET_ENTIRE_CART";
      payload: { cart: CartState; checkoutId: string };
    }
  | { type: "LOCK_CART" }
  | { type: "UNLOCK_CART" };

export interface ThemeState {
  theme: "dark-mode" | "light-mode";
}

export type ThemeAction = {
  type: "SWICTH-THEME";
};

export interface ModalState {
  open: boolean;
  view?: "USER_EDIT_PROFILE" | "USER_CREATE_ADDRESS" | "USER_EDIT_ADDRESS";
  entityId?: string;
}

export type ModalAction =
  | {
      type: "USER_EDIT_PROFILE";
    }
  | {
      type: "USER_CREATE_ADDRESS";
    }
  | {
      type: "USER_EDIT_ADDRESS";
      payload: { id: string };
    }
  | { type: "CLOSE_MODAL" };
