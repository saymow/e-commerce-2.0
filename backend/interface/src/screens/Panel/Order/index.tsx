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
import { Button, Table } from 'react-bootstrap';
import Loader from '../../../components/Loader';

const COLUMNS: Record<string, string> = {
  id: 'ID',
  userEmail: 'User Email',
  paymentSource: 'Payment Source',
  total: 'Total',
  state: 'State',
  createdAt: 'Created at',
  shipmentDate: 'Expected Delivery Date',
  details: 'Details',
};

const makeOrderRows = (orders: OrderModel[]): Array<Record<string, any>> => {
  return orders.map(order => ({
    id: shortenUUID(order.id),
    userEmail: order.user.email,
    paymentSource: order.payment_source,
    total: priceFormatter(order.total),
    state: order.state,
    createdAt: dateFormatter(order.created_at),
    shipmentDate: dateFormatter(order.shipment_deadline),
    details: <Button>Show</Button>,
  }));
};

const Order: React.FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector<typeof ReduxState>(
    state => state.orderList
  ) as ListOrdersState;
  const tableRows = useMemo(() => makeOrderRows(orders), [orders]);

  useEffect(() => {
    dispatch(listOrders);
  }, [dispatch]);

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
        <Table striped bordered hover>
          <thead>
            <tr>
              {Object.keys(COLUMNS).map(key => (
                <th key={key}>{COLUMNS[key]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map(order => (
              <tr key={order.id}>
                {Object.keys(order).map(key => (
                  <td key={key}>{order[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Order;
