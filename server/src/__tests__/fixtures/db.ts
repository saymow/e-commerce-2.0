import { createConnection } from 'typeorm';

const setupEnvironment = async () => {
  const connection = await createConnection();
  await connection.runMigrations();

  const entities = connection.entityMetadatas;

  for (const entity of entities) {
    const repository = connection.getRepository(entity.name);
    await repository.query(`DELETE FROM ${entity.tableName};`);
  }
};

export { setupEnvironment };
