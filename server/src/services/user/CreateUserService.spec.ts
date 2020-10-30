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

    const creationProcesss = createUserService.execute(invalidUser);

    expect(creationProcesss).rejects.toThrow();
  });

  it('Should not create an invalid user (invalid birth_date)', async () => {
    const createUserService = new CreateUserService();

    const invalidUser = {
      ...fakeUser,
      birth_date: '2000-6-6',
    };

    const creationProcesss = createUserService.execute(invalidUser);

    expect(creationProcesss).rejects.toThrow();
  });

  it('Should not create an invalid user (invalid contact_number)', async () => {
    const createUserService = new CreateUserService();

    const invalidUser = {
      ...fakeUser,
      contact_number: '31 9999 9999',
    };

    const creationProcess = createUserService.execute(invalidUser);

    expect(creationProcess).rejects.toThrow();
  });
});
