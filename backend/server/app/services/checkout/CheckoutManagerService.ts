import * as Yup from 'yup';
import { CHECKOUT_SERVICE_PREFIX } from '../../constants';
import { v4 } from 'uuid';
import redis from '../../config/redis';
import AppError from '../../errors/AppError';

const ShipmentMethodSchema = Yup.object().shape({
  postalCode: Yup.string().required(),
  name: Yup.string().required(),
  code: Yup.string().required(),
  value: Yup.number().required(),
  deadline: Yup.string().required(),
});

class CheckoutManagerService {
  private serviceId: string;
  private userId: string;
  private id: string; // = prefix+userId+serviceId;

  private redisExTime = 60 * 15; // in seconds
  private shipmentMethod?: ShipmentMethod;
  private Products: any;

  constructor() {}

  static async connect(userId: string, key?: string) {
    const instance = new CheckoutManagerService();

    if (!key) await instance.generateService(userId);
    else {
      await instance.validifyService(userId, key);
      await instance.populate();
    }

    return instance;
  }

  private async generateService(userId: string) {
    const serviceId = v4();
    const globalId = `${CHECKOUT_SERVICE_PREFIX}:${userId}:${serviceId}`;

    await redis.set(globalId, '{}', 'ex', this.redisExTime); //2 hours

    this.id = globalId;
    this.userId = userId;
    this.serviceId = serviceId;
  }

  private async validifyService(userId: string, serviceId: string) {
    const globalId = `${CHECKOUT_SERVICE_PREFIX}:${userId}:${serviceId}`;

    if (!(await redis.get(globalId)))
      throw new AppError('Checkout operation identifier not found.');
    else {
      this.id = globalId;
      this.userId = userId;
      this.serviceId = serviceId;
    }
  }

  private async populate() {
    let stringifyedData = await redis.get(this.id);

    if (!stringifyedData)
      throw new AppError('Checkout operation data not found.');

    let data = JSON.parse(stringifyedData);

    const { shipmentMethod } = data;

    this.shipmentMethod = shipmentMethod;
  }

  get serviceIdetenfier() {
    return this.serviceId;
  }

  async subscribeShipmentMethod(data: ShipmentMethod) {
    await ShipmentMethodSchema.validate(data);

    const shipmentMethod = new ShipmentMethod(data);

    const serviceStringfiedData = await redis.get(this.id);

    if (!serviceStringfiedData) throw new AppError('Checkout operation error');

    const serviceData = JSON.parse(serviceStringfiedData);

    const newServiceData = {
      ...serviceData,
      shipmentMethod,
    };

    const newServiceDataStringified = JSON.stringify(newServiceData);

    await redis.set(this.id, newServiceDataStringified, 'ex', this.redisExTime);

    this.shipmentMethod = shipmentMethod;
  }

  get shipmentMethodData() {
    return this.shipmentMethod;
  }
}

class ShipmentMethod {
  postalCode: string;
  name: string;
  code: string;
  value: number;
  deadline: string;

  constructor(data: ShipmentMethod) {
    this.postalCode = data.postalCode;
    this.name = data.name;
    this.code = data.code;
    this.value = data.value;
    this.deadline = data.deadline;
  }
}

export default CheckoutManagerService;
