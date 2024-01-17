import User from '../../models/User';
import { getRepository } from 'typeorm';
import {
  setupEnvironment,
  setupFakeUsers,
  tearEnvironment,
  fakeUser,
  fakeAdmin,
  fakeUser2,
} from '@__tests__/fixtures';
import AdminConfirmUserService from './AdminConfirmUserService';

beforeEach(async () => {
  await setupEnvironment();
  await setupFakeUsers();
});

afterEach(tearEnvironment);

describe('Admin User confirmation service', () => {
  it('Should confirm a valid user/valid admin', async () => {
    const adminConfirmUserService = new AdminConfirmUserService();
    const usersRepository = getRepository(User);

    const admin = await usersRepository.findOne({
      email: fakeAdmin.email,
    });

    const user = await usersRepository.findOne({ email: fakeUser.email });

    expect(user!.is_confirmed).not.toBeTruthy();

    await adminConfirmUserService.execute(admin!.id, user!.id);

    const updatedUser = await usersRepository.findOne({
      email: fakeUser.email,
    });

    expect(updatedUser!.is_confirmed).toBeTruthy();
  });

  it('Should not confirm without admin rights', async () => {
    const adminConfirmUserService = new AdminConfirmUserService();
    const usersRepository = getRepository(User);

    const supposedAdmin = await usersRepository.findOne({
      email: fakeUser.email,
    });

    const user = await usersRepository.findOne({ email: fakeUser2.email });

    expect(user!.is_confirmed).not.toBeTruthy();

    expect(
      adminConfirmUserService.execute(supposedAdmin!.id, user!.id)
    ).rejects.toBeTruthy();
  });

  it('Should disconfirm a confirmed user', async () => {
    const adminConfirmUserService = new AdminConfirmUserService();
    const usersRepository = getRepository(User);

    const userEmailTested = fakeUser.email;

    const admin = await usersRepository.findOne({
      email: fakeAdmin.email,
    });

    const user = await usersRepository.findOne({ email: userEmailTested });

    expect(user!.is_confirmed).not.toBeTruthy();

    await adminConfirmUserService.execute(admin!.id, user!.id);

    const updatedUser = await usersRepository.findOne({
      email: userEmailTested,
    });

    expect(updatedUser!.is_confirmed).toBeTruthy();

    await adminConfirmUserService.execute(admin!.id, user!.id);

    const updatedUser2 = await usersRepository.findOne({
      email: userEmailTested,
    });

    expect(updatedUser2!.is_confirmed).not.toBeTruthy();
  });
});
