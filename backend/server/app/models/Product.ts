import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  brand: string;

  @Column()
  category: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  count_in_stock: number;

  @Column()
  rating: number;

  @Column()
  num_reviews: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  trimUniqueFields() {
    this.name = this.name.trim();
  }
}

export default Product;
