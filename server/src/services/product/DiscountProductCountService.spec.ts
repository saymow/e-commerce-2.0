import CreateProductService from './CreateProductService';
import {
  setupEnvironment,
  fakeProduct,
  fakeProduct2,
  tearEnvironment,
} from '../../__tests__/fixtures/db';

import { ValidationError } from 'yup';
import DiscountProductCountInStockService from './DiscountProductCountService';
import DiscountProductCountService from './DiscountProductCountService';

beforeAll(setupEnvironment);
afterAll(tearEnvironment);

describe('Product count_in_stock discount service', () => {
  it('Should make a valid discount in count_in_stock', async () => {
    const createProductService = new CreateProductService();

    const product = await createProductService.execute(fakeProduct);

    let qty = Math.floor(Math.random() * product.count_in_stock);

    const discountProductCountService = new DiscountProductCountService();

    expect(() =>
      discountProductCountService.execute(product.id, qty)
    ).not.toThrow();
  });

  it('Should not make an invalid discount in count_in_stock', async () => {
    const createProductService = new CreateProductService();

    const product = await createProductService.execute(fakeProduct2);

    let qty = product.count_in_stock + Math.floor(Math.random() * 10);

    const discountProductCountService = new DiscountProductCountService();

    expect(
      discountProductCountService.execute(product.id, qty)
    ).rejects.toThrow();
  });
});
