import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { CartState } from "../../../@types/redux";
import usePaymentSdks from "../../../hooks/usePaymentSdks";
import { reduxStore } from "../../../store";
import { priceFormmater } from "../../../utils";
import Loading from "../../ui/Loading";

import {
  Container,
  PaymentDetails,
  DetailsSection,
  DetailsField,
  PaymentMethods,
  Method,
} from "./styles";

const CheckoutPayment: React.FC = () => {
  const dispatch = useDispatch();

  const [isReady] = usePaymentSdks();

  const cart = useSelector<typeof reduxStore>(
    (state) => state.cart
  ) as CartState;

  const handleSuccessPayment = () => {};

  if (!cart.shipmentAddress) return <Loading />; // still setting state.

  return (
    <Container>
      <PaymentDetails>
        <h2>Details</h2>
        <DetailsSection>
          <h3>Address</h3>
          <DetailsField>
            <strong>state:</strong>
            <p>{cart.shipmentAddress?.state}</p>
          </DetailsField>

          <DetailsField>
            <strong>city:</strong>
            <p>{cart.shipmentAddress?.city}</p>
          </DetailsField>

          <DetailsField>
            <strong>neighborhood:</strong>
            <p>{cart.shipmentAddress?.neighborhood}</p>
          </DetailsField>

          <DetailsField>
            <strong>postal Code:</strong>
            <p>{cart.shipmentAddress?.postal_code}</p>
          </DetailsField>

          <DetailsField>
            <strong>street:</strong>
            <p>{cart.shipmentAddress?.street}</p>
          </DetailsField>

          <DetailsField>
            <strong>number:</strong>
            <p>{(cart.shipmentAddress as any)!.number}</p>
          </DetailsField>
        </DetailsSection>
        <DetailsSection>
          <h3>shipment</h3>
          <DetailsField>
            <strong>service code:</strong>
            <p>{cart.shipmentMethod?.code}</p>
          </DetailsField>
          <DetailsField>
            <strong>service name:</strong>
            <p>{cart.shipmentMethod?.name}</p>
          </DetailsField>
          <DetailsField>
            <strong>deadline:</strong>
            <p>{cart.shipmentMethod?.deadline} days</p>
          </DetailsField>
          <DetailsField>
            <strong>price:</strong>
            <p>{priceFormmater(cart.shipmentMethod?.value as number)}</p>
          </DetailsField>
        </DetailsSection>
      </PaymentDetails>

      <PaymentMethods>
        <h2>methods</h2>
        {!isReady ? (
          <Loading />
        ) : (
          <Method>
            <PayPalButton
              amount={cart.total}
              onSuccess={handleSuccessPayment}
            />
          </Method>
        )}
      </PaymentMethods>
    </Container>
  );
};

export default CheckoutPayment;
