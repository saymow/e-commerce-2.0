import { getRepository } from 'typeorm';
import {
  fakeAdmin,
  fakeAdmin2,
  fakeUser,
  fakeUser2,
  setupEnvironment,
  setupFakeData,
  tearEnvironment,
} from '../../../__tests__/fixtures/db';
import User from '../../models/User';
import AdminDeleteUserService from './AdminDeleteUserService';

beforeAll(async () => {
  await setupEnvironment();
  await setupFakeData();
});

afterAll(tearEnvironment);

describe('Admin User delation service', () => {
  it('Should delete a user', async () => {
    const adminDeleteUserService = new AdminDeleteUserService();
    const usersRepository = getRepository(User);

    const admin = await usersRepository.findOne({
      email: fakeAdmin.email,
    });

    const user = await usersRepository.findOne({ email: fakeUser.email });

    await adminDeleteUserService.execute(admin!.id, user!.id);

    const deletedUser = await usersRepository.findOne({
      email: fakeUser.email,
    });

    expect(deletedUser).toBeUndefined();
  });

  it('Should not delete user without admin rights', async () => {
    const adminDeleteUserService = new AdminDeleteUserService();
    const usersRepository = getRepository(User);

    const supposedAdmin = await usersRepository.findOne({
      email: fakeUser2.email,
    });

    const user = await usersRepository.findOne({ email: fakeUser2.email });

    expect(
      adminDeleteUserService.execute(supposedAdmin!.id, user!.id)
    ).rejects.toBeTruthy();
  });

  it('Should not delete another admin user', async () => {
    const adminDeleteUserService = new AdminDeleteUserService();
    const usersRepository = getRepository(User);

    const admin = await usersRepository.findOne({
      email: fakeAdmin2.email,
    });

    const admin2 = await usersRepository.findOne({ email: fakeAdmin.email });

    expect(
      adminDeleteUserService.execute(admin!.id, admin2!.id)
    ).rejects.toBeTruthy();
  });
});
