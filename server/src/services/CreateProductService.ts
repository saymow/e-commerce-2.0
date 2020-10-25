import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Product from '../models/Product';

interface ProductOnCreate {
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  count_in_stock: number;
  // rating: number;
  // num_reviews: number;
}

const schema = Yup.object().shape({
  name: Yup.string().required().min(3).max(64),
  image: Yup.string().required(),
  description: Yup.string().required().min(12).max(320),
  brand: Yup.string().required().max(36),
  category: Yup.string().required().oneOf(['Electronics']),
  price: Yup.number().required(),
  count_in_stock: Yup.number().required(),
});

class CreateProductService {
  async execute(data: ProductOnCreate): Promise<Product> {
    const productsRepository = getRepository(Product);

    await schema.validate(data, {
      abortEarly: false,
    });

    const product = productsRepository.create(data);

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
