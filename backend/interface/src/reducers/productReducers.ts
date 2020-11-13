import { DefaultState } from '../@types/redux';
import {
  ProductsCreationAction,
  ProductsDefaultInteractionState,
  ProductsDeleteAction,
  ProductsEditAction,
  ProductsListAction,
  ProductsListState,
  ProductsShowAction,
  ProductsShowState,
} from '../@types/redux/product';

export const productListReducer = (
  state: ProductsListState = {},
  action: ProductsListAction
): ProductsListState => {
  switch (action.type) {
    case 'LIST_PRODUCTS_REQUEST':
      return { ...state, loading: true };
    case 'LIST_PRODUCTS_SUCCESS':
      return { loading: false, success: true, products: action.payload };
    case 'LIST_PRODUCTS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (
  state: DefaultState<{}> = {},
  action: ProductsCreationAction
): DefaultState<{}> => {
  switch (action.type) {
    case 'CREATE_PRODUCT_REQUEST':
      return {
        ...state,
        loading: true,
        reset: () => ({
          type: 'CREATE_PRODUCT_RESET',
        }),
      };
    case 'CREATE_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
      };
    case 'CREATE_PRODUCT_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_PRODUCT_RESET':
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (
  state: ProductsDefaultInteractionState = {},
  action: ProductsDeleteAction
): ProductsDefaultInteractionState => {
  switch (action.type) {
    case 'DELETE_PRODUCT_REQUEST':
      return {
        ...state,
        loading: true,
        identifier: action.payload,
        reset: () => ({
          type: 'DELETE_PRODUCT_RESET',
        }),
      };
    case 'DELETE_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
      };
    case 'DELETE_PRODUCT_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_PRODUCT_RESET':
      return {};
    default:
      return state;
  }
};

export const productEditReducer = (
  state: DefaultState<{}> = {},
  action: ProductsEditAction
): DefaultState<{}> => {
  switch (action.type) {
    case 'EDIT_PRODUCT_REQUEST':
      return {
        ...state,
        loading: true,
        reset: () => ({
          type: 'EDIT_PRODUCT_RESET',
        }),
      };
    case 'EDIT_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
      };
    case 'EDIT_PRODUCT_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'EDIT_PRODUCT_RESET':
      return {};
    default:
      return state;
  }
};

export const productShowReducer = (
  state: ProductsShowState = {},
  action: ProductsShowAction
): ProductsShowState => {
  switch (action.type) {
    case 'SHOW_PRODUCT_REQUEST':
      return { ...state, loading: true };
    case 'SHOW_PRODUCT_SUCCESS':
      return {
        loading: false,
        success: true,
        reset: () => ({
          type: 'SHOW_PRODUCT_RESET',
        }),
        product: action.payload,
      };
    case 'SHOW_PRODUCT_FAIL':
      return { loading: false, error: action.payload };
    case 'SHOW_PRODUCT_RESET':
      return {};
    default:
      return state;
  }
};
