import CreateUserService from '@services/user/CreateUserService';
import User from '../../app/models/User';
import { createConnection, getConnection, getRepository } from 'typeorm';

const fakeProduct = {
  name: 'Airpods Wireless Bluetooth Headphones',
  image: 'airpods.jpg',
  description:
    'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
  brand: 'Apple',
  category: 'Electronics',
  price: 8999,
  count_in_stock: 10,
  rating: 4.5,
  num_reviews: 12,
};

const fakeProduct2 = {
  name: 'iPhone 11 Pro 256GB Memory',
  image: 'phone.jpg',
  description:
    'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
  brand: 'Apple',
  category: 'Electronics',
  price: 59999,
  count_in_stock: 7,
  rating: 4.0,
  num_reviews: 8,
};

const fakeUser = {
  name: 'Gustavo alves',
  email: 'example@example.com',
  password: 'this_is_my_passwDord25',
  birth_date: '2000-10-28',
  contact_number: '(31) 99999-9999',
};

const fakeUser2 = {
  name: 'João da silva',
  email: 'test@example.com',
  password: 'passwDord126',
  birth_date: '2000-10-28',
  contact_number: '(31) 99999-9999',
};

const fakeAdmin = {
  name: 'admin',
  email: 'admin@admin.com',
  password: 'passwDord126',
  birth_date: '2000-10-28',
  contact_number: '(31) 99999-9999',
};

const fakeAdmin2 = {
  name: 'admin',
  email: 'admin2@admin2.com',
  password: 'passwDord126',
  birth_date: '2000-10-28',
  contact_number: '(31) 99999-9999',
};

const setupEnvironment = async () => {
  const connection = await createConnection();
  await connection.runMigrations();

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

export {
  setupEnvironment,
  setupFakeData,
  tearEnvironment,
  fakeProduct,
  fakeProduct2,
  fakeAdmin,
  fakeAdmin2,
  fakeUser,
  fakeUser2,
};
