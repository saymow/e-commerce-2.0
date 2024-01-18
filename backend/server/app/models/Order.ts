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
  ManyToOne,
  AfterLoad,
} from 'typeorm';
import OrderProduct from './OrderProduct';
import OrderAddress from './OrderAddress';
import User from './User';

export enum OrderState {
  IN_PROGRESS = 'IN-PROGRESS',
  IN_TRANSIT = 'IN-TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

@Entity('orders')
@Check(
  `"state" = UPPER("state") AND "state" IN ('IN-PROGRESS', 'IN-TRANSIT', 'DELIVERED', 'CANCELED')`
)
export class Order {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.id, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  subtototal: number;

  @Column()
  shipment_cost: number;

  @Column()
  total: number;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.order, {
    onDelete: 'CASCADE',
    eager: true,
  })
  products: OrderProduct[];

  @OneToOne(() => OrderAddress, orderAddress => orderAddress.order, {
    eager: true,
  })
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

  @AfterLoad()
  convertNumbers() {
    this.total = parseInt(this.total as any)
    this.subtototal = parseInt(this.subtototal as any)
    this.shipment_cost = parseInt(this.shipment_cost as any)
  }
}

export default Order;
