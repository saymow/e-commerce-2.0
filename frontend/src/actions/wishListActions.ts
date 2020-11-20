import { IProduct } from "../@types";
import { AsideBarAction, WishListAction, WishListState } from "../@types/redux";
import { LOCAL_STORAGE_PREFIX } from "../utils/constants";

const saveWishList = (wishList: WishListState) => {
  localStorage.setItem(
    `${LOCAL_STORAGE_PREFIX}wishList`,
    JSON.stringify(wishList)
  );
};

export const addProductToWishList = (product: IProduct) => async (
  dispatch: (arg0: WishListAction | AsideBarAction) => void,
  getState: any
) => {
  dispatch({
    type: "ADD_PRODUCT_WISHLIST",
    payload: product,
  });

  const { wishList } = getState();

  dispatch({
    type: "ASIDE_SHOW_WISHLIST",
  });
  saveWishList(wishList);
};

export const removeProductFromWishList = (id: string) => async (
  dispatch: (arg0: WishListAction | AsideBarAction) => void,
  getState: any
) => {
  dispatch({
    type: "REMOVE_PRODUCT_WISHLIST",
    payload: {
      id,
    },
  });

  const { wishList } = getState();

  dispatch({
    type: "ASIDE_SHOW_WISHLIST",
  });
  saveWishList(wishList);
};
