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
import UpdateAddressService from './UpdateAddressService';

beforeAll(async () => {
  await setupEnvironment();
  await setupFakeData();
});
afterAll(tearEnvironment);

describe('Update address service', () => {
  it('Should create a valid address', async () => {
    const createAddressService = new CreateAddressService();
    const updateAddressService = new UpdateAddressService();
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

    const address = await createAddressService.execute(fakeAddress, user!.id);

    const fakeAddress2 = {
      state: 'SP',
      city: 'example',
      neighborhood: 'dasdsad asdasd asda',
      street: 'rua iardddda',
      postal_code: '32603-235',
      number: '999',
    };

    const updatedAddress = await updateAddressService.execute(
      fakeAddress2,
      user!.id,
      address.id
    );

    expect(updatedAddress.state).not.toBe(address.state);
    expect(updatedAddress.state).toBe(fakeAddress2.state);
  });
});
