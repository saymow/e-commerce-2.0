import Axios from 'axios';
import { ListOrdersAction } from '../@types/redux/order';

export const listOrders = async (
  dispatch: (arg0: ListOrdersAction) => void
) => {
  try {
    dispatch({ type: 'LIST_ORDERS_REQUEST' });

    const response = await Axios.get('/api/checkout/list');

    dispatch({
      type: 'LIST_ORDERS_SUCCESS',
      payload: { orders: response.data },
    });
  } catch (err: any) {
    dispatch({
      type: 'LIST_ORDERS_FAIL',
      payload: { message: err.message || 'Unexpected error!' },
    });
  }
};
