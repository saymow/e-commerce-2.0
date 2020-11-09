import { DefaultState } from '.';

interface Product {
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

export type ProductsListState = DefaultState<{ products?: Product[] }>;
