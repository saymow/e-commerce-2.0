import User from '../../models/User';
import { getRepository } from 'typeorm';
import {
  setupEnvironment,
  setupFakeData,
  tearEnvironment,
  fakeUser,
  fakeUser2,
} from '../../../__tests__/fixtures/db';
import ConfirmUserService from './ConfirmUserService';

beforeAll(async () => {
  await setupEnvironment();
  await setupFakeData();
});

afterAll(tearEnvironment);

describe('User confirmation service', () => {
  it('Should confirm a valid user', async () => {
    const confirmUserService = new ConfirmUserService();
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email: fakeUser.email },
    });

    expect(user?.is_confirmed).toBe(false);

    await confirmUserService.execute(user!.id);

    const updatedUser = await usersRepository.findOne({
      where: { email: fakeUser.email },
    });

    expect(updatedUser?.is_confirmed).toBe(true);
  });

  it('Should not "disconfirm" a already confirmed user', async () => {
    const confirmUserService = new ConfirmUserService();
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email: fakeUser2.email },
    });

    expect(user?.is_confirmed).toBe(false);

    await confirmUserService.execute(user!.id);

    const updatedUser = await usersRepository.findOne({
      where: { email: fakeUser2.email },
    });

    expect(updatedUser?.is_confirmed).toBe(true);
    expect(confirmUserService.execute(user!.id)).rejects.toBeTruthy();
  });
});
