import { CartState, CartAction } from "../@types/redux";

const makeInitialState = (): CartState => {
  return {
    products: [],
    total: 0,
    subtotal: 0,
    shippingCost: 0,
    locked: false,
  };
}

export const cartReducer = (
  state: CartState = makeInitialState(),
  action: CartAction
): CartState => {
  switch (action.type) {
    case "ADD_PRODUCT_CART": {
      const product = action.payload;
      const itemExist = state.products.find(
        (_product) => _product.id === product.id
      );

      if (itemExist) {
        const newProductArray = state.products.map((_product) =>
          _product.id !== product.id
            ? _product
            : { ...product, qty: _product.qty + 1 }
        );

        return { ...state, products: newProductArray };
      }

      return {
        ...state,
        products: [...state.products, { ...product, qty: 1 }],
      };
    }
    case "REMOVE_PRODUCT_CART": {
      const { id: productId, force = false } = action.payload;

      const hasMoreThanOne = state.products.find(
        (product) => product.id === productId && product.qty > 1
      );

      if (hasMoreThanOne && !force) {
        const newProductArray = state.products.map((product) =>
          product.id !== productId
            ? product
            : { ...product, qty: product.qty - 1 }
        );

        return { ...state, products: newProductArray };
      }

      const newProductArray = state.products.filter(
        (product) => product.id !== productId
      );

      return { ...state, products: newProductArray };
    }
    case "UPDATE_TOTAL_CART": {
      const newSubtotal = state.products.reduce(
        (acumm, current) => acumm + current.price * current.qty,
        0
      );

      const newTotal = state.shippingCost + newSubtotal;

      return { ...state, total: newTotal, subtotal: newSubtotal };
    }
    case "ADD_SHIPMENT_METHOD_CART": {
      const shipmentMethod = action.payload;

      return { ...state, shipmentMethod, shippingCost: shipmentMethod.value };
    }
    case "ADD_ADDRESS_CART": {
      const shipmentAddress = action.payload;

      return { ...state, shipmentAddress };
    }
    case "LOCK_CART":
      return { ...state, locked: true };
    case "UNLOCK_CART":
      return { ...state, locked: false };
    case "SET_ENTIRE_CART": {
      const { cart, checkoutId } = action.payload;
      return { ...cart, checkoutId };
    }
    case "RESET_CART":
      return makeInitialState();
    default:
      return state;
  }
};
