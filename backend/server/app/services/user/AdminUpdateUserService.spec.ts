import {
  fakeAdmin,
  fakeAdmin2,
  fakeUser,
  setupEnvironment,
  setupFakeUsers,
  tearEnvironment,
} from '@__tests__/fixtures';
import { getRepository } from 'typeorm';
import User from '../../models/User';
import AdminUpdateUserService from './AdminUpdateUserService';

beforeEach(async () => {
  await setupEnvironment();
  await setupFakeUsers();
});
afterEach(tearEnvironment);

describe('Admin User updating service', () => {
  it('Should make a valid user update', async () => {
    const usersRepository = getRepository(User);
    const adminUpdateUserService = new AdminUpdateUserService();

    const user = await usersRepository.findOne({ email: fakeUser.email });
    const admin = await usersRepository.findOne({ email: fakeAdmin.email });

    const userUpdates = {
      name: 'SomeeNamee',
      email: 'test@test.com',
      password: 'thisIsANewPassword2',
    };

    const updatedUser = await adminUpdateUserService.execute(
      user!.id,
      userUpdates,
      admin!.id
    );

    expect(updatedUser.name).toBe(userUpdates.name);
    expect(updatedUser.email).toBe(userUpdates.email);
  });

  it('Should make a valid user update (their own profile)', async () => {
    const usersRepository = getRepository(User);
    const adminUpdateUserService = new AdminUpdateUserService();

    const admin = await usersRepository.findOne({ email: fakeAdmin.email });

    const userUpdates = {
      name: 'SomeeNamee',
      email: 'test@test2.com',
      password: 'thisIsANewPassword2',
    };

    const updatedUser = await adminUpdateUserService.execute(
      admin!.id,
      userUpdates,
      admin!.id
    );

    expect(updatedUser.name).toBe(userUpdates.name);
    expect(updatedUser.email).toBe(userUpdates.email);
  });

  it("Should not make an invalid user update (admin cant update another admin's account)", async () => {
    const usersRepository = getRepository(User);
    const adminUpdateUserService = new AdminUpdateUserService();

    const admin = await usersRepository.findOne({ email: fakeAdmin.email });
    const admin2 = await usersRepository.findOne({ email: fakeAdmin2.email });

    const userUpdates = {
      name: 'SomeeNamee',
      email: 'test@test.com',
      password: 'thisIsANewPassword2',
    };

    expect(
      adminUpdateUserService.execute(admin!.id, userUpdates, admin2!.id)
    ).rejects.toBeTruthy();
  });
});
