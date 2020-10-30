import {
  fakeUser,
  fakeUser2,
  setupEnvironment,
  tearEnvironment,
} from '../../__tests__/fixtures/db';
import CreateUserService from './CreateUserService';
import UpdateUserService from './UpdateUserService';

beforeAll(setupEnvironment);
afterAll(tearEnvironment);

describe('User updating service', () => {
  it('Should make a valid user update', async () => {
    const createUserService = new CreateUserService();
    const updateUserService = new UpdateUserService();

    const user = await createUserService.execute(fakeUser);

    expect(user.password).not.toBe(fakeUser.password);

    const userUpdates = {
      name: 'SomeeNamee',
      email: 'test@test.com',
      password: 'thisIsANewPassword2',
    };

    const updatedUser = await updateUserService.execute(user.id, userUpdates);

    expect(updatedUser.password).not.toBe(user.password);
    expect(updatedUser.password).not.toBe(userUpdates.password);
  });

  it('Should not make an invalid user update (not valid fields)', async () => {
    const createUserService = new CreateUserService();
    const updateUserService = new UpdateUserService();

    const user = await createUserService.execute(fakeUser);

    expect(user.password).not.toBe(fakeUser2.password);

    const userUpdates = {
      name: 'SomeeNamee',
      email: 'testd@test.com',
      password: 'thisIsANewPassword2',
      isAdmin: true,
    };

    const updatingProccess = updateUserService.execute(user.id, userUpdates);

    expect(updatingProccess).rejects.toThrow();
  });
});
