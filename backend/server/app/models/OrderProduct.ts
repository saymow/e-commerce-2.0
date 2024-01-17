import { Column, Entity, ManyToMany, OneToOne, PrimaryColumn } from 'typeorm';
import Product from './Product';

@Entity('order_products')
class OrderProduct {
  @PrimaryColumn()
  order_id: string;

  @OneToOne(() => Product, product => product.id)
  product: Product;

  @Column()
  unit_price: number;

  @Column()
  qty: number;
}

export default OrderProduct;
