import { IProduct } from "../@types";
import {
  AsideBarAction,
  ModalAction,
  ShopPaginationAction,
  ThemeAction,
} from "../@types/redux";
import api from "../services/api";
import { LOCAL_STORAGE_PREFIX } from "../utils/constants";

export const setupPagination = (
  products: IProduct[],
  total: number,
  pages: number
) => async (dispatch: (arg0: ShopPaginationAction) => void) => {
  dispatch({
    type: "SHOP_PAGINATION_SETUP",
    payload: { products, total, pages },
  });
};

export const shopPaginate = (page: string) => async (
  dispatch: (arg0: ShopPaginationAction) => void,
  getState: any
) => {
  try {
    dispatch({
      type: "SHOP_PAGINATION_REQUEST",
    });

    const {
      shopPagination: { limit },
    } = getState();

    const offset = limit * (parseInt(page) - 1);

    const { data } = await api.get(`/products?limit=${limit}&offset=${offset}`);

    dispatch({
      type: "SHOP_PAGINATION_SUCCESS",
      payload: {
        products: data,
        currentPage: parseInt(page),
      },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "SHOP_PAGINATION_FAIL",
      payload: err.response?.data || { message: "Unexpected error" },
    });
  }
};

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

export const switchTheme = () => async (
  dispatch: (arg0: ThemeAction) => void,
  getState: any
) => {
  dispatch({
    type: "SWICTH-THEME",
  });

  const { theme } = getState();

  localStorage.setItem(`${LOCAL_STORAGE_PREFIX}theme`, theme.theme);
};

export const openEditProfileModal = () => async (
  dispatch: (arg0: ModalAction) => void
) => {
  dispatch({
    type: "USER_EDIT_PROFILE",
  });
};

export const closeModal = () => async (
  dispatch: (arg0: ModalAction) => void
) => {
  dispatch({
    type: "CLOSE_MODAL",
  });
};
