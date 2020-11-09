import { DefaultState } from '../@types/redux';
import { ProductsListAction, ProductsListState } from '../@types/redux/product';

export const productListReducer = (
  state: ProductsListState = {},
  action: ProductsListAction
): ProductsListState => {
  switch (action.type) {
    case 'LIST_PRODUCTS_REQUEST':
      return { ...state, loading: true };
    case 'LIST_PRODUCTS_SUCCESS':
      return { loading: false, products: action.payload };
    case 'LIST_PRODUCTS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
