import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import Product from './Product';
import Order from './Order';

@Entity('orders_products')
class OrderProduct {
  @PrimaryColumn()
  order_id: string;

  @ManyToOne(() => Order, order => order.id)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;

  @PrimaryColumn()
  product_id: string;

  @OneToOne(() => Product, product => product.id, { eager: true })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  @Column()
  unit_price: number;

  @Column()
  qty: number;

  @AfterLoad()
  convertNumbers() {
    this.unit_price = parseInt(this.unit_price as any);
    this.qty = parseInt(this.qty as any);
  }
}

export default OrderProduct;
