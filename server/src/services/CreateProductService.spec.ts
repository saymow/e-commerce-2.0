import CreateProductService from './CreateProductService';
import {
  setupEnvironment,
  fakeProduct,
  fakeProduct2,
  tearEnvironment,
} from '../__tests__/fixtures/db';

import { ValidationError } from 'yup';

beforeAll(setupEnvironment);
afterAll(tearEnvironment);

describe('Product creation service', () => {
  it('Should create a valid product.', async () => {
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
  });

  it('Should not create a product using same name.', async () => {
    const createProductService = new CreateProductService();

    const invalidProduct = {
      ...fakeProduct2,
      name: fakeProduct.name,
    };

    const productCreation = createProductService.execute(invalidProduct);

    expect(productCreation).rejects.toThrow();
  });

  it('Should not create a product with negative counInStock.', async () => {
    const createProductService = new CreateProductService();

    const invalidProduct = {
      ...fakeProduct2,
      count_in_stock: -1,
    };

    const creationProcess = createProductService.execute(invalidProduct);

    // toThrow and toThrowError works in synchronous functions. .rejects handled this.
    expect(creationProcess).rejects.toThrowError(ValidationError);
  });

  it('Should not create a product with negative price', async () => {
    const createProductService = new CreateProductService();

    const invalidProduct = {
      ...fakeProduct2,
      price: -1,
    };

    const productCreation = createProductService.execute(invalidProduct);

    // toThrow and toThrowError works in synchronous functions. .rejects handled this.
    expect(productCreation).rejects.toThrowError(ValidationError);
  });

  it('Should not create a product with invalid category.', async () => {
    const createProductService = new CreateProductService();

    const invalidProduct = {
      ...fakeProduct2,
      category: 'NotAValidCategory',
    };

    const creationProcess = createProductService.execute(invalidProduct);

    // toThrow and toThrowError works in synchronous functions. .rejects handled this.
    expect(creationProcess).rejects.toThrowError(ValidationError);
  });
});
