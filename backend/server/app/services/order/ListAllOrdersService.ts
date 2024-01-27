import { getRepository } from 'typeorm';
import Order from '../../models/Order';

class ListAllOrdersService {
  async execute(): Promise<Order[]> {
    const ordersRepository = getRepository(Order);

    const orders = await ordersRepository.find();

    return orders;
  }
}

export default ListAllOrdersService;
