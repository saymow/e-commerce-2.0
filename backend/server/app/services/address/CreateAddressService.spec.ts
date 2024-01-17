import User from '../../models/User';
import { getRepository } from 'typeorm';
import {
  fakeUser,
  fakeUser2,
  setupEnvironment,
  setupFakeData,
  tearEnvironment,
} from '@__tests__/fixtures';
import CreateAddressService from './CreateAddressService';

beforeAll(async () => {
  await setupEnvironment();
  await setupFakeData();
});
afterAll(tearEnvironment);

describe('Create address service', () => {
  it('Should create a valid address', async () => {
    const createAddressService = new CreateAddressService();
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email: fakeUser.email },
    });

    const fakeAddress = {
      state: 'MG',
      city: 'dsadas',
      neighborhood: 'dasdsad asdasd asda',
      street: 'rua iardddda',
      postal_code: '32603-235',
      number: '999',
    };

    const creationProcess = createAddressService.execute(fakeAddress, user!.id);

    expect(creationProcess).resolves.toBeTruthy();
  });

  it('Should not create more than 9 addresses per user', async () => {
    const createAddressService = new CreateAddressService();
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email: fakeUser2.email },
    });

    const fakeAddress = {
      state: 'MG',
      city: 'dsadas',
      neighborhood: 'dasdsad asdasd asda',
      street: 'rua iardddda',
      postal_code: '32603-235',
      number: '999',
    };

    for (let i = 0; i < 9; i++) {
      await createAddressService.execute(fakeAddress, user!.id);
    }

    const creationProcess = createAddressService.execute(fakeAddress, user!.id);

    expect(creationProcess).rejects.toThrow();
  });
});
