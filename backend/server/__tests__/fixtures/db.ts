import CreateUserService from '@services/user/CreateUserService';
import User from '../../app/models/User';
import argon2 from 'argon2';
import { createConnection, getConnection, getRepository } from 'typeorm';
import { fakeUser, fakeUser2, fakeAdmin, fakeAdmin2 } from '.';

const setupEnvironment = async () => {
  const connection = await createConnection();
  // await connection.runMigrations();
  jest.useFakeTimers();

  const entities = connection.entityMetadatas;

  for (const entity of entities) {
    const repository = connection.getRepository(entity.name);
    await repository.query(`DELETE FROM ${entity.tableName};`);
  }
};

const setupFakeData = async () => {
  const usersRepository = getRepository(User);

  const hashCraeteUserDataPass = async (user: any) => {
    user.password = await argon2.hash(user.password);

    return user;
  };

  await Promise.all([
    usersRepository.save(
      usersRepository.create(await hashCraeteUserDataPass(fakeUser))
    ),
    usersRepository.save(
      usersRepository.create(await hashCraeteUserDataPass(fakeUser2))
    ),
    usersRepository.save(
      usersRepository.create(await hashCraeteUserDataPass(fakeAdmin))
    ),
    usersRepository.save(
      usersRepository.create(await hashCraeteUserDataPass(fakeAdmin2))
    ),
  ]);
};

const tearEnvironment = async () => {
  const connection = getConnection('default');
  await connection.close();
};

export { setupEnvironment, setupFakeData, tearEnvironment };
