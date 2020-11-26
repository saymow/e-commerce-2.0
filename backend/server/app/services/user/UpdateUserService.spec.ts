import { getRepository } from 'typeorm';
import {
  fakeAdmin,
  fakeUser,
  setupEnvironment,
  setupFakeData,
  tearEnvironment,
} from '../../../__tests__/fixtures/db';
import { TEST_GENERATED_UUID } from '../../constants';
import User from '../../models/User';
import AdminConfirmUserService from './AdminConfirmUserService';
import UpdateConfirmedUserEmailService from './UpdateConfirmedUserEmailService';
import UpdateUserService from './UpdateUserService';

beforeEach(async () => {
  await setupEnvironment();
  await setupFakeData();
});
afterEach(tearEnvironment);

describe('User updating service', () => {
  it('Should make a valid user update', async () => {
    const usersRepository = getRepository(User);
    const updateUserService = new UpdateUserService();

    const user = await usersRepository.findOne({
      where: { email: fakeUser.email },
    });

    const userUpdates = {
      name: 'SomeeNamee',
      password: 'thisIsANewPassword2',
    };

    const {
      user: updatedUser,
      confirmationEmail,
      token,
    } = await updateUserService.execute(user!.id, userUpdates);

    expect(confirmationEmail).toBeNull();
    expect(token).toBeNull();
    expect(updatedUser.password).not.toBe(user!.password);
    expect(updatedUser.password).not.toBe(userUpdates.password);
  });

  it('Should not update user email at first, when email is confirmed, (It should return a valid token used to update email)', async () => {
    const usersRepository = getRepository(User);
    const updateUserService = new UpdateUserService();
    const adminConfirmUserService = new AdminConfirmUserService();

    const user = await usersRepository.findOne({
      where: { email: fakeUser.email },
    });

    const admin = await usersRepository.findOne({
      where: { email: fakeAdmin.email },
    });

    await adminConfirmUserService.execute(admin!.id, user!.id);

    const userUpdates = {
      name: 'SomeeNamee',
      email: 'testddd@test.com',
      password: 'thisIsANewPassword2',
    };

    const {
      user: updatedUser,
      confirmationEmail,
      token,
    } = await updateUserService.execute(user!.id, userUpdates);

    expect(token).toEqual(expect.stringContaining(TEST_GENERATED_UUID));
    expect(confirmationEmail).toBeTruthy();
    expect(updatedUser.email).not.toBe(userUpdates.email);
    expect(updatedUser.password).not.toBe(user!.password);
    expect(updatedUser.password).not.toBe(userUpdates.password);
  });

  it('Should update user email at "second", when email is confirmed, (It use a valid token used to update email)', async () => {
    const usersRepository = getRepository(User);

    const updateUserService = new UpdateUserService();
    const updateConfirmedUserEmailService = new UpdateConfirmedUserEmailService();
    const adminConfirmUserService = new AdminConfirmUserService();

    const user = await usersRepository.findOne({
      where: { email: fakeUser.email },
    });

    const admin = await usersRepository.findOne({
      where: { email: fakeAdmin.email },
    });

    await adminConfirmUserService.execute(admin!.id, user!.id);

    const userUpdates = {
      name: 'SomeeNamee',
      email: 'testddd@test.com',
      password: 'thisIsANewPassword2',
    };

    const {
      user: updatedUser,
      confirmationEmail,
      token,
    } = await updateUserService.execute(user!.id, userUpdates);

    expect(token).toEqual(expect.stringContaining(TEST_GENERATED_UUID));
    expect(confirmationEmail).toBeTruthy();
    expect(updatedUser.email).not.toBe(userUpdates.email);
    expect(updatedUser.password).not.toBe(user!.password);
    expect(updatedUser.password).not.toBe(userUpdates.password);

    const UpdatedUser = await updateConfirmedUserEmailService.execute(
      token as string
    );

    expect(UpdatedUser.email).toEqual(userUpdates.email);
  });

  it('Should not make an invalid user update (not valid fields)', async () => {
    const usersRepository = getRepository(User);
    const updateUserService = new UpdateUserService();

    const user = await usersRepository.findOne({
      where: { email: fakeUser.email },
    });

    const userUpdates = {
      name: 'SomeeNamee',
      email: 'testd@test.com',
      password: 'thisIsANewPassword2',
      isAdmin: true,
    };

    const updatingProccess = updateUserService.execute(user!.id, userUpdates);

    expect(updatingProccess).rejects.toBeTruthy();
  });
});
