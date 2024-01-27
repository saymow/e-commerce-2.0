import React, { useEffect, useMemo } from 'react';
import { Container, Options } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../../../actions/orderActions';
import { ReduxState } from '../../../store';
import {
  ListOrdersState,
  Order as OrderModel,
} from '../../../@types/redux/order';
import { dateFormatter, priceFormatter, shortenUUID } from '../../../utils';
import { Message } from 'styled-icons/boxicons-regular';
import { Button } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import Table, { Row } from '../../../components/Table';

const COLUMNS = {
  id: 'ID',
  userEmail: 'User Email',
  paymentSource: 'Payment Source',
  total: 'Total',
  state: 'State',
  createdAt: 'Created at',
  shipmentDate: 'Expected Delivery Date',
  details: 'Details',
};

const makeOrderRows = (orders: OrderModel[]): Array<Row<typeof COLUMNS>> => {
  return orders.map(order => ({
    id: shortenUUID(order.id),
    userEmail: order.user.email,
    paymentSource: order.payment_source,
    total: priceFormatter(order.total),
    state: order.state,
    createdAt: dateFormatter(order.created_at),
    shipmentDate: dateFormatter(order.shipment_deadline),
    details: (
      <Button variant="secondary" size="sm">
        Show
      </Button>
    ),
  }));
};

const Order: React.FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector<typeof ReduxState>(
    state => state.orderList
  ) as ListOrdersState;

  useEffect(() => {
    dispatch(listOrders);
  }, [dispatch]);

  const rows = useMemo(() => makeOrderRows(orders), [orders]);

  return (
    <Container>
      <Options>
        <h1>Orders</h1>
      </Options>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table columns={COLUMNS} idColumn="id" rows={rows} />
      )}
    </Container>
  );
};

export default Order;
