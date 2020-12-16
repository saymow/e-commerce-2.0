import {
  fakeUser,
  setupEnvironment,
  setupFakeData,
  tearEnvironment,
} from '@__tests__/fixtures';
import LoginService from './LoginService';

beforeAll(async () => {
  await setupEnvironment();
  await setupFakeData();
});

afterAll(tearEnvironment);

describe('User login service', () => {
  it('Should be able to login using valid credentials', async () => {
    const loginService = new LoginService();

    const loginProcess = loginService.execute(
      fakeUser.email,
      fakeUser.password
    );

    expect(loginProcess).rejects.not.toBeTruthy();
  });

  it('Should not be able to login using invalid credentials (Not existing email)', async () => {
    const loginService = new LoginService();

    const loginProcess = loginService.execute(
      'notRegistered@gmail.com',
      fakeUser.password
    );

    expect(loginProcess).rejects.toBeTruthy();
  });

  it('Should not be able to login using invalid credentials (Wrong password)', async () => {
    const loginService = new LoginService();

    const loginProcess = loginService.execute(fakeUser.email, 'randomPasda23');

    expect(loginProcess).rejects.toBeTruthy();
  });
});
