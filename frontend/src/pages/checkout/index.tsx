import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CartState } from "../../@types/redux";
import CheckoutLayout from "../../components/checkout/CheckoutLayout/CheckoutLayout";
import Layout from "../../components/core/Layout";
import Link from "../../components/core/Link";
import Button from "../../components/ui/Button";
import { reduxStore } from "../../store";
import { priceFormmater } from "../../utils";

const Container = styled.div``;

const Details = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 1rem;
`;

const DataRow = styled.div<{ highlight?: boolean }>`
  display: flex;
  justify-content: space-between;

  text-transform: uppercase;
  padding: 1rem;
  font-size: 2rem;
  border: 1px solid var(--lighter-Grey);

  background: ${({ highlight }) =>
    highlight ? "var(--light-Grey)" : "inherit"};

  p,
  p strong {
    color: ${({ highlight }) => (highlight ? "var(--bg-Color)" : "inherit")};
  }
`;

const Checkout: React.FC = () => {
  const { total, subtotal, shippingCost } = useSelector<typeof reduxStore>(
    (state) => state.cart
  ) as CartState;
  return (
    <Layout>
      <CheckoutLayout title="total cart">
        <Container>
          <Details>
            <DataRow>
              <p>
                <strong>subtotal</strong>
              </p>
              <p>{priceFormmater(subtotal)}</p>
            </DataRow>
            <DataRow>
              <p>
                <strong>shipping Cost</strong>
              </p>
              <p>{priceFormmater(shippingCost)}</p>
            </DataRow>
            <DataRow highlight>
              <p>
                <strong>total</strong>
              </p>
              <p>{priceFormmater(total)}</p>
            </DataRow>
          </Details>
          <Button variant="fill">
            <Link href="/checkout/shippment"> SHIPMENT METHOD </Link>
          </Button>
        </Container>
      </CheckoutLayout>
    </Layout>
  );
};

export default Checkout;
