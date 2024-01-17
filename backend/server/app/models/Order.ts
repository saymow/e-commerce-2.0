import {
  Entity,
  Check,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import OrderProduct from './OrderProduct';
import OrderAddress from './OrderAddress';

@Entity('orders')
@Check(
  `"state" = UPPER("state") AND "state" IN ('IN-PROGRESS', 'IN-TRANSIT', 'DELIVERED', 'CANCELED')`
)
export class Order {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  subtototal: number;

  @Column()
  shipment_cost: number;

  @Column()
  total: number;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.order_id, {
    onDelete: 'CASCADE',
  })
  products: OrderProduct[];

  @OneToOne(() => OrderAddress, (orderAddress) => orderAddress.order_id)
  address: OrderAddress; 

  @Column()
  shipment_code: string;

  @Column({ type: 'timestamp' })
  shipment_deadline: Date;

  @Column()
  payment_id: string;

  @Column()
  payment_source: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    type: 'varchar',
    transformer: {
      to: value => value.toUpperCase(),
      from: value => value,
    },
  })
  state: string;
}

export default Order;
