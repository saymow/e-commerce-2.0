jest.useFakeTimers();

import CreateUserService from '@services/user/CreateUserService';
import User from '../../app/models/User';
import argon2 from 'argon2';
import { createConnection, getConnection, getRepository } from 'typeorm';
import {
  fakeUser,
  fakeUser2,
  fakeAdmin,
  fakeAdmin2,
  fakeProduct,
  fakeProduct2,
} from '.';
import Order from '../../app/models/Order';
import Product from '../../app/models/Product';
import Address from '../../app/models/Address';
import OrderAddress from '../../app/models/OrderAddress';
import OrderProduct from '../../app/models/OrderProduct';

const setupEnvironment = async () => {
  try {
    const connection = await createConnection();

    await connection.runMigrations();

    const entities = connection.entityMetadatas;

    for (const entity of entities) {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName};`);
    }
  } catch (err) {
    console.error(err);
  }
};

const setupFakeUsers = async () => {
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

const setupFakeProducts = async () => {
  const productsRepository = getRepository(Product);

  await Promise.all([
    productsRepository.save(productsRepository.create(fakeProduct)),
    productsRepository.save(productsRepository.create(fakeProduct2)),
  ]);
};

const tearEnvironment = async () => {
  const connection = getConnection('default');

  await connection.close();
};

export { setupEnvironment, setupFakeUsers, setupFakeProducts, tearEnvironment };
