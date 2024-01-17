import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderTable1705449095174 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
    CREATE TABLE orders (
        id VARCHAR PRIMARY KEY NOT NULL,
        subtototal NUMERIC NOT NULL,
        shipment_cost NUMERIC NOT NULL,
        total NUMERIC NOT NULL,
        shipment_code VARCHAR NOT NULL,
        shipment_deadline TIMESTAMP NOT NULL,
        payment_id VARCHAR NOT NULL,
        payment_source VARCHAR NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        state VARCHAR NOT NULL CHECK (UPPER(state) IN ('IN-PROGRESS', 'IN-TRANSIT', 'DELIVERED', 'CANCELED'))
    );
    `
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE orders;
    `);
  }
}
