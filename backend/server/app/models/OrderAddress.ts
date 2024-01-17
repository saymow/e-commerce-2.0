import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import Order from './Order';

@Entity('orders_address')
class OrderAddress {
  @PrimaryColumn()
  order_id: string;

  @OneToOne(() => Order, order => order.id)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  neighboorhod: string;

  @Column()
  postal_code: string;

  @Column()
  street: string;

  @Column()
  number: number;
}

export default OrderAddress;
