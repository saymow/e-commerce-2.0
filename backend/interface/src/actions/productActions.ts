import {
  Product,
  ProductsCreationAction,
  ProductsDeleteAction,
  ProductsEditAction,
  ProductsListAction,
  ProductsShowAction,
} from '../@types/redux/product';
import { Dispatch } from '../@types/redux';

import axios from 'axios';

export const listProducts = () => async (
  dispatch: Dispatch<ProductsListAction>
) => {
  try {
    dispatch({ type: 'LIST_PRODUCTS_REQUEST' });

    const { data } = await axios.get('/api/admin/products');

    dispatch({ type: 'LIST_PRODUCTS_SUCCESS', payload: data });
  } catch (err) {
    dispatch({
      type: 'LIST_PRODUCTS_FAIL',
      payload: err.response.data,
    });
  }
};

export const createProduct = (product: FormData) => async (
  dispatch: Dispatch<ProductsCreationAction>
) => {
  try {
    dispatch({ type: 'CREATE_PRODUCT_REQUEST' });

    await axios.post('/api/admin/products', product);

    dispatch({ type: 'CREATE_PRODUCT_SUCCESS' });
  } catch (err) {
    dispatch({
      type: 'CREATE_PRODUCT_FAIL',
      payload: err.response.data,
    });
  }
};

export const deleteProduct = (id: string) => async (
  dispatch: Dispatch<ProductsDeleteAction>
) => {
  try {
    dispatch({ type: 'DELETE_PRODUCT_REQUEST' });

    await axios.delete(`/api/admin/products/${id}`);

    dispatch({ type: 'DELETE_PRODUCT_SUCCESS' });
  } catch (err) {
    dispatch({
      type: 'DELETE_PRODUCT_FAIL',
      payload: err.response.data,
    });
  }
};

export const editProduct = (product: any, productId: string) => async (
  dispatch: Dispatch<ProductsEditAction>
) => {
  try {
    dispatch({ type: 'EDIT_PRODUCT_REQUEST' });

    await axios.put(`/api/admin/products/${productId}`, product);

    dispatch({ type: 'EDIT_PRODUCT_SUCCESS' });
  } catch (err) {
    dispatch({
      type: 'EDIT_PRODUCT_FAIL',
      payload: err.response.data,
    });
  }
};

export const showProduct = (id: string) => async (
  dispatch: Dispatch<ProductsShowAction>
) => {
  try {
    dispatch({ type: 'SHOW_PRODUCT_REQUEST' });

    const { data } = await axios.put(`/api/admin/products/${id}`);

    dispatch({ type: 'SHOW_PRODUCT_SUCCESS', payload: data });
  } catch (err) {
    dispatch({
      type: 'SHOW_PRODUCT_FAIL',
      payload: err.response.data,
    });
  }
};
