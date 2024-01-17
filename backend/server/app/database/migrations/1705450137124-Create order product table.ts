import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderProductTable1705450137124
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
    CREATE TABLE orders_products (
        order_id VARCHAR NOT NULL,
        product_id UUID NOT NULL,
        unit_price NUMERIC NOT NULL,
        qty NUMERIC NOT NULL,
        CONSTRAINT ORDER_PRODUCTS_PK PRIMARY KEY (order_id, product_id),
        CONSTRAINT ORDER_PRODUCTS_ORDER_FK FOREIGN KEY (order_id)
            REFERENCES orders(id)
            ON DELETE CASCADE
    );     
    `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE orders_products;
    `);
  }
}
