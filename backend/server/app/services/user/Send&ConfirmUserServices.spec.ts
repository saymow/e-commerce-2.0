import User from '../../models/User';
import { getRepository } from 'typeorm';
import {
  setupEnvironment,
  setupFakeUsers,
  tearEnvironment,
  fakeUser,
  fakeUser2,
} from '@__tests__/fixtures';
import ConfirmUserService from './ConfirmUserService';
import SendUserConfirmationEmail from './SendUserConfirmationEmail';

beforeEach(async () => {
  await setupEnvironment();
  await setupFakeUsers();
});

afterEach(tearEnvironment);

describe('User confirmation service', () => {
  it('Should confirm a valid user', async () => {
    const sendUserConfirmationEmail = new SendUserConfirmationEmail();
    const confirmUserService = new ConfirmUserService();
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email: fakeUser.email },
    });

    expect(user?.is_confirmed).toBe(false);

    const token = await sendUserConfirmationEmail.execute(user!.id);

    await confirmUserService.execute(token);

    const updatedUser = await usersRepository.findOne({
      where: { email: fakeUser.email },
    });

    expect(updatedUser?.is_confirmed).toBe(true);
  });

  it('Should not "disconfirm" a already confirmed user, (token expired)', async () => {
    const sendUserConfirmationEmail = new SendUserConfirmationEmail();
    const confirmUserService = new ConfirmUserService();
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email: fakeUser2.email },
    });

    expect(user?.is_confirmed).toBe(false);

    const token = await sendUserConfirmationEmail.execute(user!.id);

    await confirmUserService.execute(token);

    const updatedUser = await usersRepository.findOne({
      where: { email: fakeUser2.email },
    });

    expect(updatedUser?.is_confirmed).toBe(true);
    expect(confirmUserService.execute(token)).rejects.toBeTruthy();
  });
});
