import { validate } from 'uuid';
import {
  fakeUser,
  setupEnvironment,
  setupFakeUsers,
  tearEnvironment,
} from '@__tests__/fixtures';
import ChangePasswordService from './ChangePasswordService';
import ForgotPasswordService from './ForgotPasswordService';
import LoginService from './LoginService';
import { TEST_GENERATED_UUID } from '../../constants';

beforeAll(async () => {
  await setupEnvironment();
  await setupFakeUsers();
});

afterAll(tearEnvironment);

describe('Forgot & Change password services', () => {
  it('It should be able send forgot mail password and reset password', async () => {
    const forgotPasswordService = new ForgotPasswordService();
    const changePasswordService = new ChangePasswordService();
    const loginService = new LoginService();

    const token = await forgotPasswordService.execute(fakeUser.email);

    expect(token).toEqual(expect.stringContaining(TEST_GENERATED_UUID));

    let newPassword = 'D465s4A56Ss5da';

    await changePasswordService.execute(token, newPassword);
    const { id } = await loginService.execute(fakeUser.email, newPassword);

    //Valid user id (UUID)
    expect(validate(id)).toBe(true);
  });

  it('It should not be able send forgot mail password and reset password (email not in use)', async () => {
    const forgotPasswordService = new ForgotPasswordService();

    const forgotPasswordProcess = forgotPasswordService.execute(
      'test@test.com'
    );

    expect(forgotPasswordProcess).rejects.toBeTruthy();
  });

  it('It should not be able send forgot mail password and reset password (invalid new password)', async () => {
    const forgotPasswordService = new ForgotPasswordService();
    const changePasswordService = new ChangePasswordService();

    const token = await forgotPasswordService.execute(fakeUser.email);

    expect(token).toEqual(expect.stringContaining(TEST_GENERATED_UUID));

    let newPassword = 'invalid';

    const changePasswordProcess = changePasswordService.execute(
      token,
      newPassword
    );

    expect(changePasswordProcess).rejects.toBeTruthy();
  });

  it('It should not be able send forgot mail password and reset password (Using the token twice.)', async () => {
    const forgotPasswordService = new ForgotPasswordService();
    const changePasswordService = new ChangePasswordService();
    const loginService = new LoginService();

    const token = await forgotPasswordService.execute(fakeUser.email);

    expect(token).toEqual(expect.stringContaining(TEST_GENERATED_UUID));

    let newPassword = 'D465s4A56Ss5da';
    let newPassword2 = 'dPSJDopkepOK4DKOPAd';

    await changePasswordService.execute(token, newPassword);
    const { id } = await loginService.execute(fakeUser.email, newPassword);

    //Valid user id (UUID)
    expect(validate(id)).toBe(true);

    const changePasswordProcess = changePasswordService.execute(
      fakeUser.email,
      newPassword2
    );

    expect(changePasswordProcess).rejects.toBeTruthy();
  });
});
