import { shippingServicePriceFormmater } from '../utils/servicesFormatters';
import { Any, getRepository } from 'typeorm';
import * as Yup from 'yup';
import AppError from '../errors/AppError';
import ShipmentServices from '../lib/ShipmentServices';
import Product from '../models/Product';
import { CartProduct, InitialCart, ShipmentMethod } from './CheckoutManager';
import { schema as filledAddressSchema } from '@services/address/CreateAddressService';
import { schema as toFillAddressSchema } from '@services/address/UpdateAddressService';

const ShipmentMethodSchema = Yup.object().shape({
  postalCode: Yup.string().required(),
  name: Yup.string().required(),
  code: Yup.string().required(),
  value: Yup.number().required(),
  deadline: Yup.string().required(),
});

export interface ToFillAdress {
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  postal_code: string;
}

export interface FilledAddress extends ToFillAdress {
  number: string;
}

class CartManager implements InitialCart {
  products: CartProduct[];
  total: number;
  subtotal: number;
  shippingCost: number;
  shipmentMethod: ShipmentMethod;
  shipmentAddress: ToFillAdress | FilledAddress;
  constructor() {}

  static async create(data: InitialCart) {
    const cart = new CartManager();

    const {
      products,
      shipmentMethod,
      total,
      shippingCost,
      subtotal,
      shipmentAddress,
    } = data;

    const validations: Promise<void>[] = [];

    validations.push(cart.validateCart({ products, total, subtotal }));

    validations.push(
      cart.validateShipmentMethod({
        shipmentMethod,
        shippingCost,
      })
    );

    validations.push(
      cart.validateAddress(shipmentAddress, shipmentMethod.postalCode)
    );

    validations.push(cart.validateTotalPrice(subtotal, shippingCost, total));

    await Promise.all(validations);

    cart.products = data.products;
    cart.shipmentMethod = data.shipmentMethod;
    cart.total = data.total;
    cart.subtotal = data.subtotal;
    cart.shippingCost = data.shippingCost;
    cart.shipmentAddress = data.shipmentAddress;

    return cart;
  }

  private async validateShipmentMethod({
    shipmentMethod,
    shippingCost,
  }: {
    shipmentMethod: ShipmentMethod;
    shippingCost: number;
  }) {
    const shipmentServices = new ShipmentServices();

    await ShipmentMethodSchema.validate(shipmentMethod);

    if (shippingCost !== shipmentMethod.value)
      throw new AppError('Invalid checkout data.');

    const shipmentTrustedData = await shipmentServices.getDeliveryMethod(
      shipmentMethod.postalCode,
      shipmentMethod.code
    );

    if (!shipmentTrustedData) throw new AppError('Invalid checkout data');

    const realPrice = shippingServicePriceFormmater(shipmentTrustedData.value);

    if (shippingCost !== realPrice || shipmentMethod.value !== realPrice)
      throw new AppError('Invalid checkout data');
  }

  private async validateAddress(
    address: FilledAddress | ToFillAdress,
    postalCode: string
  ) {
    const shipmentServices = new ShipmentServices();

    // then is a filled and definitive address
    if ((address as any).number) await filledAddressSchema.validate(address);
    else await toFillAddressSchema.validate(address);

    const addressTrustedData = await shipmentServices.getAddress(postalCode);

    if (
      addressTrustedData.state.localeCompare(address.state) !== 0 ||
      addressTrustedData.city.localeCompare(address.city) !== 0 ||
      addressTrustedData.neighborhood.localeCompare(address.neighborhood) !== 0
    ) {
      throw new AppError('Invalid checkout data');
    }
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
    const trustedSubtotal = trustedProducts.reduce((acumm, next) => {
      const clientProductQty = (data.products.find(
        _product => _product.id === next.id
      ) as CartProduct).qty;

      return acumm + next.price * clientProductQty;
    }, 0);

    if (
      trustedProducts.length !== data.products.length ||
      trustedSubtotal !== data.subtotal
    )
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

export default CartManager;
