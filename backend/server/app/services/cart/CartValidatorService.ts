import { Cart } from '@services/checkout/CheckoutService';
import AppError from '../../errors/AppError';
import Product from '../../models/Product';
import { In, getRepository } from 'typeorm';
import * as yup from 'yup';

const productSchema = yup.object({
  id: yup.string().uuid().required(),
  qty: yup.number().integer().min(1).required(),
});

const shipmentMethodSchema = yup.object({
  code: yup.string().required(),
  name: yup.string().required(),
  value: yup.number().integer().required(),
  deadline: yup.string().required(),
  postalCode: yup
    .string()
    .matches(/^\d{5}-\d{3}$/)
    .required(),
});

const shipmentAddressSchema = yup.object({
  state: yup.string().required(),
  city: yup.string().required(),
  neighborhood: yup.string().required(),
  postal_code: yup
    .string()
    .matches(/^\d{5}-\d{3}$/)
    .required(),
  street: yup.string().required(),
  number: yup.number().integer().required(),
});

const validationSchema = yup.object({
  products: yup.array().of(productSchema).required(),
  shipmentMethod: shipmentMethodSchema.required(),
  total: yup
    .number()
    .integer()
    .required()
    .test('Total sum is correct', 'Total sum is not correct', function (value) {
      return value === this.parent.subtotal + this.parent.shippingCost;
    }),
  subtotal: yup.number().integer().required(),
  shippingCost: yup.number().integer().required(),
  shipmentAddress: shipmentAddressSchema.required(),
});

class CartValidatorService {
  async execute(cart: Cart) {
    await validationSchema.validate(cart);

    const productsRepository = getRepository(Product);
    const products = await productsRepository.find({
      where: { id: In(cart.products.map(product => product.id)) },
    });

    for (const cartProduct of cart.products) {
      const product = products.find(item => item.id === cartProduct.id);

      if (!product) {
        throw new AppError(`Product ${cartProduct.id} does not exist`);
      }
      if (product!.count_in_stock < cartProduct.qty) {
        throw new AppError(`Product ${product?.name} is out of stock`);
      }
    }

    return Promise.resolve();
  }
}

export default CartValidatorService;
