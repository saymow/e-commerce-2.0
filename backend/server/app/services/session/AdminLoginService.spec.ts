import {
  fakeUser,
  setupEnvironment,
  setupFakeUsers,
  tearEnvironment,
  fakeAdmin,
} from '@__tests__/fixtures';
import AdminLoginService from './AdminLoginService';
import LoginService from './LoginService';

beforeAll(async () => {
  await setupEnvironment();
  await setupFakeUsers();
});

afterAll(tearEnvironment);

describe('Admin login service', () => {
  it('Should be able to login using valid credentials and as admin', async () => {
    const adminLoginService = new AdminLoginService();

    const loginProcess = adminLoginService.execute(
      fakeAdmin.email,
      fakeAdmin.password
    );

    expect(loginProcess).rejects.not.toBeTruthy();
  });

  it('Should not be able to login without admin rights', async () => {
    const adminLoginService = new AdminLoginService();

    const loginProcess = adminLoginService.execute(
      fakeUser.email,
      fakeUser.password
    );

    expect(loginProcess).rejects.toBeTruthy();
  });
});
