import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserIdColumnOnTableOrdersXD1705604957303
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE orders
        ADD user_id UUID NOT NULL,
        ADD CONSTRAINT ORDER_USER_FK FOREIGN KEY (user_id) REFERENCES users(id);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE orders
        DROP CONSTRAINT IF EXISTS ORDER_USER_FK,
        DROP COLUMN IF EXISTS user_id; 
    `)
  }
}
