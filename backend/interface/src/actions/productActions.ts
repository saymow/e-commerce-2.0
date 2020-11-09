import { ProductsListAction } from '../@types/redux/product';
import { Dispatch } from '../@types/redux';

import axios from 'axios';

export const listProducts = () => async (
  dispatch: Dispatch<ProductsListAction>
) => {
  try {
    dispatch({ type: 'LIST_PRODUCTS_REQUEST' });

    const { data } = await axios.get('/api/products');

    dispatch({ type: 'LIST_PRODUCTS_SUCCESS', payload: data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'LIST_PRODUCTS_FAIL',
      payload: err.response.data.message,
    });
  }
};
