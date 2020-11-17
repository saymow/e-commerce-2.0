import { ThunkDispatch } from "redux-thunk";
import { IProduct } from "../@types";
import { ShopPaginationAction } from "../reducers/paginationReducers";
import api from "../services/api";
import { reduxStore } from "../store";

export const setupPagination = (
  products: IProduct[],
  total: number,
  pages: number
) => async (dispatch: (arg0: ShopPaginationAction) => void) => {
  dispatch({
    type: "SHOP-PAGINATION-SETUP",
    payload: { products, total, pages },
  });
};

export const shopPaginate = (page: string) => async (
  dispatch: (arg0: ShopPaginationAction) => void,
  getState: any
) => {
  try {
    dispatch({
      type: "SHOP-PAGINATION-REQUEST",
    });

    const {
      shopPagination: { limit },
    } = getState();

    const offset = limit * (parseInt(page) - 1);

    const { data } = await api.get(`/products?limit=${limit}&offset=${offset}`);
    console.log(data);

    dispatch({
      type: "SHOP-PAGINATION-SUCCESS",
      payload: {
        products: data,
        currentPage: parseInt(page),
      },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "SHOP-PAGINATION-FAIL",
      payload: err.response?.data || { message: "Unexpected error" },
    });
  }
};
