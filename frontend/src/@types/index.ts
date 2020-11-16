export interface IProduct {
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
