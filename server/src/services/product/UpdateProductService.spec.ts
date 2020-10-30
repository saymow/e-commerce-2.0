import {
  setupEnvironment,
  fakeProduct,
  fakeProduct2,
  tearEnvironment,
} from '../../__tests__/fixtures/db';

import { ValidationError } from 'yup';
import UpdateProductService from './UpdateProductService';
import CreateProductService from './CreateProductService';
import AppError from '../../errors/AppError';

beforeAll(setupEnvironment);
afterAll(tearEnvironment);

describe('Product updating service', () => {
  it('Should create a valid product and make valid updates.', async () => {
    const createProductService = new CreateProductService();

    const createdProduct = await createProductService.execute(fakeProduct);

    const createdProductKeys = Object.keys(createdProduct);

    expect(createdProductKeys.sort()).toEqual(
      [
        'name',
        'description',
        'brand',
        'category',
        'image',
        'price',
        'count_in_stock',
        'id',
        'rating',
        'num_reviews',
        'created_at',
        'updated_at',
      ].sort()
    );

    const updateProductService = new UpdateProductService();

    let updates = {
      name: 'Smartphone',
      brand: 'Samsung',
      category: 'Electronics',
      count_in_stock: 18,
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel, alias omnis facere vitae laudantium magni libero voluptatum consequuntur commodi odio inventore natus? Voluptatem sed doloribus obcaecati fuga exercitationem dolorem quisquam.',
      image: 'Smartphone.jpg',
      price: 60000,
    };

    const updatedProduct = await updateProductService.execute(
      createdProduct.id,
      updates
    );

    expect({
      name: updatedProduct.name,
      brand: updatedProduct.brand,
      category: updatedProduct.category,
      count_in_stock: updatedProduct.count_in_stock,
      description: updatedProduct.description,
      image: updatedProduct.image,
      price: updatedProduct.price,
    }).toEqual(updates);
  });

  it('Should craete a valid product but shouldnt be able to make invalid updates', async () => {
    const createProductService = new CreateProductService();

    const createdProduct = await createProductService.execute(fakeProduct2);

    const createdProductKeys = Object.keys(createdProduct);

    expect(createdProductKeys.sort()).toEqual(
      [
        'name',
        'description',
        'brand',
        'category',
        'image',
        'price',
        'count_in_stock',
        'id',
        'rating',
        'num_reviews',
        'created_at',
        'updated_at',
      ].sort()
    );

    const updateProductService = new UpdateProductService();

    const updateProcess = updateProductService.execute(createdProduct.id, {
      rating: 3,
      num_reviews: 1,
    } as any);

    expect(updateProcess).rejects.toBeTruthy();
  });
});
