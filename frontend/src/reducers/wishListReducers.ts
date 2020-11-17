import { WishListState, WishListAction } from "../@types/redux";

export const wishListReducer = (
  state: WishListState = { products: [] },
  action: WishListAction
): WishListState => {
  switch (action.type) {
    case "ADD_PRODUCT_WISHLIST": {
      const product = action.payload;
      return { ...state, products: [...state.products, product] };
    }
    case "REMOVE_PRODUCT_WISHLIST": {
      const id = action.payload.id;
      const newProducts = state.products.filter((product) => product.id !== id);

      return { ...state, products: newProducts };
    }
    default:
      return state;
  }
};
