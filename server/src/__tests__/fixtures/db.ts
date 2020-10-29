import { Connection, createConnection, getConnection } from 'typeorm';

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

const setupEnvironment = async () => {
  const connection = await createConnection();
  await connection.runMigrations();

  const entities = connection.entityMetadatas;

  for (const entity of entities) {
    const repository = connection.getRepository(entity.name);
    await repository.query(`DELETE FROM ${entity.tableName};`);
  }
};

const tearEnvironment = async () => {
  const connection = getConnection('default');
  await connection.close();
};

export { setupEnvironment, tearEnvironment, fakeProduct, fakeProduct2 };
