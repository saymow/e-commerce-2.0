import { Link } from 'react-router-dom';
import { Order } from '../../../../@types/redux/order';
import { Row } from '../../../../components/Table';
import { shortenUUID, priceFormatter, dateFormatter } from '../../../../utils';
import React from 'react';
import { Checked, Unchecked } from '../../User/styles';

export const ORDER_INFO_COLUMNS = {
  id: 'ID',
  userEmail: 'User Email',
  paymentSource: 'Payment Source',
  paymentId: 'Payment ID',
  total: 'Total',
  state: 'State',
  createdAt: 'Created at',
  shipmentDate: 'Expected Delivery Date',
};

export const ORDER_INFO_ID_COLUMN = 'id';

export const makeOrderInfoRow = (
  order: Order
): Array<Row<typeof ORDER_INFO_COLUMNS>> => {
  return [
    {
      id: shortenUUID(order.id),
      userEmail: order.user.email,
      paymentSource: order.payment_source,
      paymentId: order.payment_id,
      total: priceFormatter(order.total),
      state: order.state,
      createdAt: dateFormatter(order.created_at),
      shipmentDate: dateFormatter(order.shipment_deadline),
    },
  ];
};

export const ORDER_PRODUCT_COLUMNS = {
  count: '#',
  qty: 'Qty',
  price: 'Price',
  total: 'Total',
  productName: 'Name',
};

export const ORDER_PRODUCT_ID_COLUMN = 'count';

export const makeOrderProductsRows = (
  order: Order
): Array<Row<typeof ORDER_PRODUCT_COLUMNS>> => {
  return order.products.map((orderProduct, idx) => ({
    count: idx + 1,
    qty: orderProduct.qty,
    price: priceFormatter(orderProduct.unit_price),
    total: priceFormatter(orderProduct.qty * orderProduct.unit_price),
    productName: (
      <Link to={`/panel/products/${orderProduct.product.id}/edit`}>
        {orderProduct.product.name}
      </Link>
    ),
  }));
};

export const ORDER_USER_INFO_COLUMNS = {
  id: 'ID',
  email: 'Email',
  phone: 'Phone',
  confirmed: 'Confirmed',
  admin: 'Admin',
};

export const ORDER_USER_INFO_ID_COLUMN = 'id';

export const makeOrderUserRow = (
  order: Order
): Array<Row<typeof ORDER_USER_INFO_COLUMNS>> => {
  return [
    {
      id: shortenUUID(order.user.id),
      email: (
        <Link to={`/panel/users/${order.user.id}/edit`}>
          {order.user.email}
        </Link>
      ),
      phone: order.user.contact_number,
      confirmed: order.user.is_confirmed ? <Checked /> : <Unchecked />,
      admin: order.user.is_admin ? (
        <Checked className="no-action" />
      ) : (
        <Unchecked />
      ),
    },
  ];
};

export const ORDER_ADDRESS_COLUMNS = {
  state: 'State',
  city: 'City',
  neighborhood: 'Neighborhood',
  postal_code: 'PostalCode',
  street: 'Street',
  number: 'Number',
};

export const ORDER_ADDRESS_COLUMN_ID = 'state';

export const makeOrderAddressRow = (
  order: Order
): Array<Row<typeof ORDER_ADDRESS_COLUMNS>> => {
  return [
    {
      state: order.address.state,
      city: order.address.city,
      neighborhood: order.address.neighborhood,
      postal_code: order.address.postal_code,
      street: order.address.street,
      number: order.address.number,
    },
  ];
};

export const ORDER_SHIPMENT_COLUMNS = {
  code: 'Code',
  cost: 'Price',
  deadline: 'Deadline',
};

export const ORDER_SHIPMENT_COLUMN_ID = 'code';

export const makeOrderShipmentRow = (
  order: Order
): Array<Row<typeof ORDER_SHIPMENT_COLUMNS>> => {
  return [
    {
      code: order.shipment_code,
      cost: priceFormatter(order.shipment_cost),
      deadline: dateFormatter(order.shipment_deadline),
    },
  ];
};
