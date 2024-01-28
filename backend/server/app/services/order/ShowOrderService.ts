import { getRepository } from 'typeorm';
import Order from '../../models/Order';
import AppError from '../../errors/AppError';

class ShowOrderService {
  async execute(orderId: string): Promise<Order> {
    const ordersRepository = getRepository(Order);

    const order = await ordersRepository.findOne(orderId);

    if (!order) {
      throw new AppError(`Order ${orderId} not found`);
    }

    return order;
  }
}

export default ShowOrderService;
