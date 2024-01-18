import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import Order from './Order';

@Entity('orders_address')
class OrderAddress {
  @PrimaryColumn()
  order_id: string;

  @OneToOne(() => Order, order => order.id)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  postal_code: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @AfterLoad()
  convertNumbers() {
    this.number = parseInt(this.number as any);
  }
}

export default OrderAddress;
