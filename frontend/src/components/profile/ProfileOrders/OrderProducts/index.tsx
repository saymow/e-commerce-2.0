import styled from "styled-components";
import Image from "next/image";
import { OrderProduct } from "../../../../@types/redux/orders";
import { priceFormmater } from "../../../../utils";
import { ScrollStyles } from "../../../../styles/globalStyles";

const List = styled.ul`
  height: 100%;
  overflow: auto;
  
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  border: 1px solid var(--lighter-Grey);
  padding: 1rem;

  ${ScrollStyles}
`;

const Item = styled.li`
  list-style: none;

  position: relative;
  display: flex;
  gap: 1rem;

  .order-product-price {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

interface Props {
  orderProducts: OrderProduct[];
}

const OrderProducts: React.FC<Props> = (props) => {
  const { orderProducts } = props;

  return (
    <List>
      {orderProducts.map((orderProduct) => (
        <Item key={orderProduct.product.id}>
          <Image src={orderProduct.product.image} width={100} height={100} />
          <h3>{orderProduct.product.name}</h3>
          <span className="order-product-price">
            {orderProduct.qty} x {priceFormmater(orderProduct.unit_price)}
          </span>
        </Item>
      ))}
    </List>
  );
};

export default OrderProducts;
