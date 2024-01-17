import { Cart } from '@services/checkout/CheckoutService';
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
      return value === this.parent.subtotal + this.parent.shippingCOst;
    }),
  subtotal: yup.number().integer().required(),
  shippingCost: yup.number().integer().required(),
  shipmentAddress: shipmentAddressSchema.required(),
});

class CartValidatorService {
  async execute(cart: Cart) {
    await validationSchema.validate(cart);

    return Promise.resolve();
  }
}

export default CartValidatorService;
