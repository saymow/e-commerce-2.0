import User from '../../models/User';
import { getRepository } from 'typeorm';
import {
  setupEnvironment,
  setupFakeData,
  tearEnvironment,
  fakeUser,
  fakeUser2,
  fakeAdmin,
} from '../../../__tests__/fixtures/db';
import SetAdminService from './SetAdminService';

beforeAll(async () => {
  await setupEnvironment();
  await setupFakeData();
});

afterAll(tearEnvironment);

describe('Set as admin service', () => {
  it('Should be able to set an admin', async () => {
    const setAdminService = new SetAdminService();
    const usersRepository = getRepository(User);

    const admin = await usersRepository.findOne({
      email: fakeAdmin.email,
    });

    const user = await usersRepository.findOne({ email: fakeUser.email });

    expect(user!.is_admin).not.toBeTruthy();

    await setAdminService.execute(admin!.id, user!.id);

    const updatedUser = await usersRepository.findOne({
      email: fakeUser.email,
    });

    expect(updatedUser!.is_admin).toBeTruthy();
  });

  it('Should not be able to set an admin (no admin rights)', async () => {
    const setAdminService = new SetAdminService();
    const usersRepository = getRepository(User);

    const user1 = await usersRepository.findOne({
      email: fakeAdmin.email,
    });

    const user2 = await usersRepository.findOne({ email: fakeUser2.email });

    expect(setAdminService.execute(user1!.id, user2!.id)).rejects.toBeTruthy();
  });
});
