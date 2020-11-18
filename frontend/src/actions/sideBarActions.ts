import { AsideBarAction } from "../@types/redux";

export const openCart = () => async (
  dispatch: (arg0: AsideBarAction) => void
) => {
  dispatch({
    type: "ASIDE_SHOW_CART",
  });
};

export const openWishlist = () => async (
  dispatch: (arg0: AsideBarAction) => void
) => {
  dispatch({
    type: "ASIDE_SHOW_WISHLIST",
  });
};

export const closeAsidebar = () => async (
  dispatch: (arg0: AsideBarAction) => void
) => {
  dispatch({
    type: "ASIDE_CLOSE",
  });
};
