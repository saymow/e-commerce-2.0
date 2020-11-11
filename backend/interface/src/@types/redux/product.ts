import { DefaultState } from '.';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  image: string;
  num_reviews: number;
  price: number;
  count_in_stock: number;
  rating: number;
  created_at: Date;
  updated_at: Date;
}

export type ProductsListAction =
  | { type: 'LIST_PRODUCTS_REQUEST' }
  | {
      type: 'LIST_PRODUCTS_SUCCESS';
      payload: any;
    }
  | { type: 'LIST_PRODUCTS_FAIL'; payload: { message: string } };

export type ProductsCreationAction =
  | { type: 'CREATE_PRODUCT_REQUEST' }
  | {
      type: 'CREATE_PRODUCT_SUCCESS';
    }
  | { type: 'CREATE_PRODUCT_FAIL'; payload: { message: string } }
  | { type: 'CREATE_PRODUCT_RESET' };

export type ProductsDeleteAction =
  | { type: 'DELETE_PRODUCT_REQUEST' }
  | {
      type: 'DELETE_PRODUCT_SUCCESS';
    }
  | { type: 'DELETE_PRODUCT_FAIL'; payload: { message: string } }
  | { type: 'DELETE_PRODUCT_RESET' };

export type ProductsEditAction =
  | { type: 'EDIT_PRODUCT_REQUEST' }
  | {
      type: 'EDIT_PRODUCT_SUCCESS';
    }
  | { type: 'EDIT_PRODUCT_FAIL'; payload: { message: string } }
  | { type: 'EDIT_PRODUCT_RESET' };

export type ProductsShowAction =
  | { type: 'SHOW_PRODUCT_REQUEST' }
  | {
      type: 'SHOW_PRODUCT_SUCCESS';
      payload: Product;
    }
  | { type: 'SHOW_PRODUCT_FAIL'; payload: { message: string } }
  | { type: 'SHOW_PRODUCT_RESET' };

export type ProductsListState = DefaultState<{ products?: Product[] }>;
export type ProductsShowState = DefaultState<{ product?: Product }>;
