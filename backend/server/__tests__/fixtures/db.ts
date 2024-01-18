jest.useFakeTimers();

import argon2 from 'argon2';
import { createConnection, getConnection, getRepository } from 'typeorm';
import {
  fakeAdmin,
  fakeAdmin2,
  fakeProduct,
  fakeProduct2,
  fakeUser,
  fakeUser2,
} from '.';
import Product from '../../app/models/Product';
import User from '../../app/models/User';

const setupEnvironment = async () => {
  try {
    const connection = await createConnection();

    await connection.runMigrations();

    await connection.query('DELETE FROM orders_address;');
    await connection.query('DELETE FROM orders_products;');
    await connection.query('DELETE FROM orders;');
    await connection.query('DELETE FROM users;');
    await connection.query('DELETE FROM products;');
    await connection.query('DELETE FROM addresses;');

    // const entities = connection.entityMetadatas;

    // for (const entity of entities) {
    //   const repository = connection.getRepository(entity.name);
    //   await repository.query(`DELETE FROM ${entity.tableName};`);
    // }
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

export { setupEnvironment, setupFakeProducts, setupFakeUsers, tearEnvironment };
