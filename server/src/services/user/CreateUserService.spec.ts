import {
  fakeUser,
  fakeUser2,
  setupEnvironment,
  tearEnvironment,
} from '../../__tests__/fixtures/db';
import CreateUserService from './CreateUserService';

beforeAll(setupEnvironment);
afterAll(tearEnvironment);

describe('User creation service', () => {
  it('Should create a valid user', async () => {
    const createUserService = new CreateUserService();

    const user = await createUserService.execute(fakeUser);

    expect(user.password).not.toBe(fakeUser.password);
  });

  it('Should not create an invalid user (email in use)', async () => {
    const createUserService = new CreateUserService();

    const invalidUser = {
      ...fakeUser2,
      email: 'example@example.com',
    };

    const creationProcess = createUserService.execute(invalidUser);

    // toThrow methods expects an instance of Error Object, not custom errors
    // That's the why i'm only expecting it to reject.
    await expect(creationProcess).rejects.toBeTruthy();
  });

  it('Should not create an invalid user (invalid birth_date)', async () => {
    const createUserService = new CreateUserService();

    const invalidUser = {
      ...fakeUser,
      birth_date: '2000-6-6',
    };

    const creationProcess = createUserService.execute(invalidUser);

    await expect(creationProcess).rejects.toBeTruthy();
  });

  it('Should not create an invalid user (invalid contact_number)', async () => {
    const createUserService = new CreateUserService();

    const invalidUser = {
      ...fakeUser,
      contact_number: '31 9999 9999',
    };

    const creationProcess = createUserService.execute(invalidUser);

    await expect(creationProcess).rejects.toBeTruthy();
  });
});
