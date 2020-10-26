import CreateProductService from './CreateProductService';
import { setupEnvironment } from '../__tests__/fixtures/db';

import { ValidationError } from 'yup';

beforeAll(setupEnvironment);

describe('Product creation service', () => {
  it('Should create a valid product', async () => {
    const createProductService = new CreateProductService();

    const product = {
      name: 'Aiddddd',
      description:
        'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offersBluetooth technology lets you connect it with compatible devices wirelessly Hi',
      brand: 'Apple',
      category: 'Electronics',
      image: 'Televisão',
      count_in_stock: 10,
      price: 8999,
    };

    const createdProduct = await createProductService.execute(product);

    const createdProductKeys = Object.keys(createdProduct);

    expect(createdProductKeys).toEqual([
      'name',
      'description',
      'brand',
      'category',
      'image',
      'price',
      'count_in_stock',
      'id',
      'created_at',
      'updated_at',
    ]);
  });

  it('Should not create a product with negative counInStock', async () => {
    const createProductService = new CreateProductService();

    const product = {
      name: 'other_product',
      description:
        'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offersBluetooth technology lets you connect it with compatible devices wirelessly Hi',
      brand: 'Apple',
      category: 'Electronics',
      image: 'Televisão',
      count_in_stock: -1,
      price: 8999,
    };

    const creationProcess = createProductService.execute(product);

    // toThrow and toThrowError works in synchronous functions. .rejects handled this.
    expect(creationProcess).rejects.toThrowError(ValidationError);
  });
});
