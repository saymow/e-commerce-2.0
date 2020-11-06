import Product from '../../models/Product';
import formatImageUrl from '../../utils/formatImageUrl';

export default {
  render(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      brand: product.brand,
      category: product.category,
      image: formatImageUrl('products', product.image),
      price: product.price,
      count_in_stock: product.count_in_stock,
      rating: product.rating,
      num_reviews: product.num_reviews,
      created_at: product.created_at,
      updated_at: product.updated_at,
    };
  },

  renderMany(products: Product[]) {
    return products.map(product => this.render(product));
  },
};
