import { IProduct } from "../@types";
import { AsideBarAction, CartAction, CartState } from "../@types/redux";
import { ShipmentData } from "../@types/redux/checkout";
import { LOCAL_STORAGE_PREFIX } from "../utils/constants";

const saveCart = (cart: CartState) => {
  localStorage.setItem(`${LOCAL_STORAGE_PREFIX}cart`, JSON.stringify(cart));
};

export const addProductToCart = (product: IProduct) => async (
  dispatch: (arg0: CartAction | AsideBarAction) => void,
  getState: any
) => {
  dispatch({ type: "ADD_PRODUCT_CART", payload: product });
  dispatch({ type: "UPDATE_TOTAL_CART" });
  dispatch({ type: "ASIDE_SHOW_CART" });

  const { cart } = getState();

  saveCart(cart);
};

export const removeProductFromCart = (
  id: string,
  force: boolean = false
) => async (
  dispatch: (arg0: CartAction | AsideBarAction) => void,
  getState: any
) => {
  dispatch({ type: "REMOVE_PRODUCT_CART", payload: { id, force } });
  dispatch({ type: "UPDATE_TOTAL_CART" });
  dispatch({ type: "ASIDE_SHOW_CART" });

  const { cart } = getState();

  saveCart(cart);
};

export const addShipmmentDataToCart = (shipmentMethod: ShipmentData) => async (
  dispatch: (arg0: CartAction) => void
) => {
  dispatch({ type: "ADD_SHIPMENT_METHOD_CART", payload: shipmentMethod });
  dispatch({ type: "UPDATE_TOTAL_CART" });
};

export const resetCart = () => async (dispatch: (arg0: CartAction) => void) => {
  dispatch({ type: "RESET_CART" });
};
