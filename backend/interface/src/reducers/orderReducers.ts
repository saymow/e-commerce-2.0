import { ListOrdersAction, ListOrdersState } from '../@types/redux/order';

const initialState: ListOrdersState = {
  orders: [],
};

export const listOrdersReducer = (
  state: ListOrdersState = initialState,
  action: ListOrdersAction
) => {
  switch (action.type) {
    case 'LIST_ORDERS_REQUEST': {
      return {
        ...state,
        loading: true,
        reset: () => ({ type: 'LIST_ORDERS_RESET' }),
      };
    }
    case 'LIST_ORDERS_SUCCESS': {
      const { orders } = action.payload;

      return {
        ...state,
        orders,
        loading: false,
        success: true,
      };
    }
    case 'LIST_ORDERS_FAIL': {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case 'LIST_ORDERS_RESET':
      return {
        ...state,
        orders: [],
      };
    default:
      return state;
  }
};
