import CreateUserService from '@services/user/CreateUserService';
import User from '../../app/models/User';
import { createConnection, getConnection, getRepository } from 'typeorm';
import { fakeUser, fakeUser2, fakeAdmin, fakeAdmin2 } from '.';

const setupEnvironment = async () => {
  const connection = await createConnection();
  await connection.runMigrations();
  jest.useFakeTimers();

  const entities = connection.entityMetadatas;

  for (const entity of entities) {
    const repository = connection.getRepository(entity.name);
    await repository.query(`DELETE FROM ${entity.tableName};`);
  }
};

const setupFakeData = async () => {
  const usersRepository = getRepository(User);
  const createUserService = new CreateUserService();

  await Promise.all([
    createUserService.execute(fakeUser),
    createUserService.execute(fakeUser2),
    usersRepository.save(
      usersRepository.create({
        ...fakeAdmin,
        is_admin: true,
      })
    ),
    usersRepository.save(
      usersRepository.create({
        ...fakeAdmin2,
        is_admin: true,
      })
    ),
  ]);
};

const tearEnvironment = async () => {
  const connection = getConnection('default');
  await connection.close();
};

export { setupEnvironment, setupFakeData, tearEnvironment };
