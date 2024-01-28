import React, { useEffect, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showOrder } from '../../../../actions/orderActions';
import {
  ORDER_ADDRESS_COLUMNS,
  ORDER_ADDRESS_COLUMN_ID,
  ORDER_INFO_COLUMNS,
  ORDER_INFO_ID_COLUMN,
  ORDER_PRODUCT_COLUMNS,
  ORDER_PRODUCT_ID_COLUMN,
  ORDER_SHIPMENT_COLUMNS,
  ORDER_SHIPMENT_COLUMN_ID,
  ORDER_USER_INFO_COLUMNS,
  ORDER_USER_INFO_ID_COLUMN,
  makeOrderAddressRow,
  makeOrderInfoRow,
  makeOrderProductsRows,
  makeOrderShipmentRow,
  makeOrderUserRow,
} from './helpers';
import { ReduxState } from '../../../../store';
import { ShowOrderState } from '../../../../@types/redux/order';
import Table from '../../../../components/Table';
import OrderInfoSection from './OrderInfoSection';
import { Container, DataSection } from './styles';
import { Message } from 'styled-icons/boxicons-regular';
import Loader from '../../../../components/Loader';

const ShowOrder: React.FC = () => {
  const id = (useParams() as { id: string }).id;
  const history = useHistory();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector<typeof ReduxState>(
    state => state.orderShow
  ) as ShowOrderState;

  useEffect(() => {
    dispatch(showOrder(id));
  }, [dispatch, id]);

  const handleGoBack = () => {
    history.goBack();
  };

  const infoRow = useMemo(() => (order ? makeOrderInfoRow(order) : []), [
    order,
  ]);
  const productRows = useMemo(
    () => (order ? makeOrderProductsRows(order) : []),
    [order]
  );
  const userRow = useMemo(() => (order ? makeOrderUserRow(order) : []), [
    order,
  ]);
  const userAddressRow = useMemo(
    () => (order ? makeOrderAddressRow(order) : []),
    [order]
  );
  const shipmentRow = useMemo(
    () => (order ? makeOrderShipmentRow(order) : []),
    [order]
  );

  return (
    <Container>
      <Button variant="light" size="lg" onClick={handleGoBack}>
        Go back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error.message}</Message>
      ) : (
        <DataSection>
          <OrderInfoSection
            title="General"
            table={
              <Table
                columns={ORDER_INFO_COLUMNS}
                idColumn={ORDER_INFO_ID_COLUMN}
                rows={infoRow}
              />
            }
          />
          <OrderInfoSection
            title="User"
            table={
              <Table
                columns={ORDER_USER_INFO_COLUMNS}
                idColumn={ORDER_USER_INFO_ID_COLUMN}
                rows={userRow}
              />
            }
          />
          <OrderInfoSection
            title="Products"
            table={
              <Table
                columns={ORDER_PRODUCT_COLUMNS}
                idColumn={ORDER_PRODUCT_ID_COLUMN}
                rows={productRows}
              />
            }
          />
          <OrderInfoSection
            title="Address"
            table={
              <Table
                columns={ORDER_ADDRESS_COLUMNS}
                idColumn={ORDER_ADDRESS_COLUMN_ID}
                rows={userAddressRow}
              />
            }
          />
          <OrderInfoSection
            title="Shipment"
            table={
              <Table
                columns={ORDER_SHIPMENT_COLUMNS}
                idColumn={ORDER_SHIPMENT_COLUMN_ID}
                rows={shipmentRow}
              />
            }
          />
        </DataSection>
      )}
    </Container>
  );
};

export default ShowOrder;
