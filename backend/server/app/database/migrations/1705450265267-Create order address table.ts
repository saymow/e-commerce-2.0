import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderAddressTable1705450265267
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
     `
      CREATE TABLE orders_address (
        order_id VARCHAR PRIMARY KEY NOT NULL,
        state VARCHAR NOT NULL,
        city VARCHAR NOT NULL,
        neighborhood VARCHAR NOT NULL,
        postal_code VARCHAR NOT NULL,
        street VARCHAR NOT NULL,
        number NUMERIC NOT NULL,
        CONSTRAINT ORDER_ADDRESS_ORDER_FK FOREIGN KEY (order_id)
            REFERENCES orders(id)
            ON DELETE CASCADE
    );   
    `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE orders_address;
    `);
  }
}
