import formatImageUrl from '../../utils/formatImageUrl';
import Order from '../../models/Order';

export default {
  render(order: Order) {
    return {
      ...order,
      products: order.products.map(orderProduct => ({
        ...orderProduct,
        product: {
          ...orderProduct.product,
          image: formatImageUrl('products', orderProduct.product.image),
        },
      })),
    };
  },

  renderMany(orders: Order[]) {
    return orders.map(order => this.render(order));
  },
};
