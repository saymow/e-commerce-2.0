import {
  fakeUser,
  setupEnvironment,
  setupFakeData,
  tearEnvironment,
} from '@__tests__/fixtures';
import { getRepository } from 'typeorm';
import User from '../models/User';
import CheckoutManager from './CheckoutManager';

beforeAll(async () => {
  await setupEnvironment();
  await setupFakeData();
});

afterAll(async () => {
  await tearEnvironment();
});

describe('Checkout: CheckoutInitalCartManager validation tests', () => {
  it('Should create and connect with a valid checkout connection', async () => {
    const usersRepository = getRepository(User);

    const user = (await usersRepository.findOne({
      where: { email: fakeUser.email },
    })) as User;

    const checkoutManager = await CheckoutManager.connect(user.id); // craeting a connection;

    const serviceId = checkoutManager.serviceIdetenfier;

    expect(CheckoutManager.connect(user.id, serviceId)).toBeDefined();
  });

  it('Should not create and connect with a valid checkout connection (invalid serviceId)', async () => {
    const usersRepository = getRepository(User);

    const user = (await usersRepository.findOne({
      where: { email: fakeUser.email },
    })) as User;

    const checkoutManager = await CheckoutManager.connect(user.id); // craeting a connection;

    const serviceId =
      checkoutManager.serviceIdetenfier + 'turning-id-to-invalid';

    expect(CheckoutManager.connect(user.id, serviceId)).rejects.toBeTruthy();
  });
});
