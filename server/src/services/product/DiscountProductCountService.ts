import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Product from '../../models/Product';

class DiscountProductCountService {
  async execute(id: string, qty: number) {
    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne(id);

    if (!product) throw new AppError(`Product using id ${id} mot found.`);

    if (product.count_in_stock < qty)
      throw new AppError(`We haven't enough ${product.name} on our stock!`);

    product.count_in_stock -= qty;

    await productsRepository.save(product);
  }
}

export default DiscountProductCountService;
