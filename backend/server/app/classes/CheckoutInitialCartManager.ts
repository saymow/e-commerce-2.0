import { Any, getRepository } from 'typeorm';
import * as Yup from 'yup';
import AppError from '../errors/AppError';
import CorreiosServiceValidatorService from '../lib/CorreiosServiceValidatorService';
import Product from '../models/Product';
import { CartProduct, InitialCart, ShipmentMethod } from './CheckoutManager';

const ShipmentMethodSchema = Yup.object().shape({
  postalCode: Yup.string().required(),
  name: Yup.string().required(),
  code: Yup.string().required(),
  value: Yup.number().required(),
  deadline: Yup.string().required(),
});

class InitialCartManager implements InitialCart {
  products: CartProduct[];
  total: number;
  subtotal: number;
  shippingCost: number;
  shipmentMethod: ShipmentMethod;
  constructor() {}

  static async create(data: InitialCart) {
    const cart = new InitialCartManager();

    const { products, shipmentMethod, total, shippingCost, subtotal } = data;

    const validations: Promise<void>[] = [];

    validations.push(cart.validateCart({ products, total, subtotal }));

    validations.push(
      cart.validateShipmentMethod({
        shipmentMethod,
        shippingCost,
      })
    );

    validations.push(cart.validateTotalPrice(subtotal, shippingCost, total));

    await Promise.all(validations);

    cart.products = data.products;
    cart.shipmentMethod = data.shipmentMethod;
    cart.total = data.total;
    cart.subtotal = data.subtotal;
    cart.shippingCost = data.shippingCost;

    return cart;
  }

  private async validateShipmentMethod({
    shipmentMethod,
    shippingCost,
  }: {
    shipmentMethod: ShipmentMethod;
    shippingCost: number;
  }) {
    const correiosServiceValidator = new CorreiosServiceValidatorService();

    if (shippingCost !== shipmentMethod.value)
      throw new AppError('Invalid checkout data.');

    await correiosServiceValidator.execute(
      shipmentMethod.postalCode,
      shipmentMethod.code,
      shipmentMethod.value
    );

    await ShipmentMethodSchema.validate(shipmentMethod);
  }

  private async validateCart(data: {
    products: CartProduct[];
    total: number;
    subtotal: number;
  }) {
    const productsRepository = getRepository(Product);

    const productsIds = data.products.map(product => product.id);

    const trustedProducts = await productsRepository.find({
      where: {
        id: Any(productsIds),
      },
    });

    if (trustedProducts.length !== data.products.length)
      throw new AppError('Invalid checkout data.');

    const trustedSubtotal = trustedProducts.reduce((acumm, next) => {
      const clientProductQty = (data.products.find(
        _product => _product.id === next.id
      ) as CartProduct).qty;

      return acumm + next.price * clientProductQty;
    }, 0);

    if (trustedSubtotal !== data.subtotal)
      throw new AppError('Invalid checkout data.');
  }

  private async validateTotalPrice(
    subtotal: number,
    shippingCost: number,
    total: number
  ) {
    if (subtotal + shippingCost !== total)
      throw new AppError('Invalid checkout data.');
  }
}

export default InitialCartManager;
