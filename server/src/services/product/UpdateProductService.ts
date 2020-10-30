import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import AppError from '../../errors/AppError';
import Product from '../../models/Product';

const schema = Yup.object().shape({
  name: Yup.string().min(3).max(64),
  image: Yup.string(),
  description: Yup.string().min(12).max(320),
  brand: Yup.string().max(36),
  category: Yup.string().oneOf(['Electronics']),
  price: Yup.number(),
  count_in_stock: Yup.number(),
});

type UpdatableFields =
  | 'name'
  | 'description'
  | 'brand'
  | 'category'
  | 'image'
  | 'price'
  | 'count_in_stock';

class UpdateProductService {
  async execute(id: string, data: Record<UpdatableFields, string | number>) {
    const productsRepository = getRepository(Product);

    const updates = Object.keys(data);
    const updatableFields = [
      'name',
      'description',
      'brand',
      'category',
      'image',
      'price',
      'count_in_stock',
    ];

    const isValidUpdate = updates.every(key => updatableFields.includes(key));

    if (!isValidUpdate) throw new AppError('Invalid update fields');

    await schema.validate(data, {
      abortEarly: false,
    });

    const product = await productsRepository.findOne(id);

    if (!product) throw new AppError('Product not found', 404);

    updates.map(key => {
      (product as any)[key] = data[key as UpdatableFields];
    });

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
