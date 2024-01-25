import { getRepository } from 'typeorm';
import Order from '../../models/Order';

class ListOrdersService {
  async execute(userId: string): Promise<Order[]> {
    const ordersRepository = getRepository(Order);

    const orders = await ordersRepository.find({
      where: { user: { id: userId } },
    });

    return orders;
  }
}

export default ListOrdersService;
