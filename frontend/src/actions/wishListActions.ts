import { IProduct } from "../@types";
import { WishListAction, WishListState } from "../@types/redux";

const saveWishList = (wishList: WishListState) => {
  localStorage.setItem("eCommerce2.0:wishList", JSON.stringify(wishList));
};

export const addProductToWishList = (product: IProduct) => async (
  dispatch: (arg0: WishListAction) => void,
  getState: any
) => {
  dispatch({
    type: "ADD_PRODUCT_WISHLIST",
    payload: product,
  });

  const { wishList } = getState();

  saveWishList(wishList);
};

export const removeProductFromWishList = (id: string) => async (
  dispatch: (arg0: WishListAction) => void,
  getState: any
) => {
  dispatch({
    type: "REMOVE_PRODUCT_WISHLIST",
    payload: {
      id,
    },
  });

  const { wishList } = getState();

  saveWishList(wishList);
};
