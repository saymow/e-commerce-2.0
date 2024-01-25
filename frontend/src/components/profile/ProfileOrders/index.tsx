import React from "react";
import { Order } from "../../../@types/redux/orders";
import styled from "styled-components";
import DataCard from "../../ui/DataCard";
import { dateFormmater, priceFormmater } from "../../../utils";
import OrderProducts from "./OrderProducts";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Item = styled.li`
  height: 420px;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 1rem;

  box-shadow: 1px 5px 5px -1px rgba(0, 0, 0, 0.3);
  padding: 1rem;
`;

const ItemDetails = styled.section`
  display: grid;
  grid-template-areas:
    "a a"
    "b c";

  > article {
    margin: 0;

    &:first-child {
      grid-area: a;
    }
  }
`;

interface Props {
  orders: Order[];
}

const ProfileOrders: React.FC<Props> = (props) => {
  const { orders } = props;

  return (
    <List>
      {orders.map((order) => (
        <Item key={order.id}>
          <ItemDetails>
            <DataCard
              title={"Payment"}
              fields={[
                { label: "Id", value: order.id },
                { label: "Total", value: priceFormmater(order.total) },
                { label: "Payment source", value: order.payment_source },
                { label: "Status", value: order.state },
                {
                  label: "Created at",
                  value: dateFormmater(order.created_at),
                },
                {
                  label: "Estimated delivery date",
                  value: dateFormmater(order.shipment_deadline),
                },
              ]}
            />
            <DataCard
              title="Address"
              fields={[
                { label: "State", value: order.address.state },
                {
                  label: "City",
                  value: order.address.city,
                },
                {
                  label: "Neighborhood",
                  value: order.address.neighborhood,
                },
                {
                  label: "Postal code",
                  value: order.address.postal_code,
                },
                {
                  label: "Street",
                  value: order.address.street,
                },
                {
                  label: "Number",
                  value: (order.address as any).number,
                },
              ]}
            />
            <DataCard
              title="Shipment"
              fields={[
                { label: "Service code", value: order.shipment_code },
                { label: "Price", value: priceFormmater(order.shipment_cost) },
              ]}
            />
          </ItemDetails>
          <OrderProducts orderProducts={order.products} />
        </Item>
      ))}
    </List>
  );
};

export default ProfileOrders;
