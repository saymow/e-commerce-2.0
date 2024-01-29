import React from "react";
import { PayPalButton, PayPalButtonProps } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { CartState } from "../../../@types/redux";
import usePaymentSdks from "../../../hooks/usePaymentSdks";
import { reduxStore } from "../../../store";
import { priceFormmater } from "../../../utils";
import Loading from "../../ui/Loading";

import { Container, PaymentDetails, PaymentMethods, Method } from "./styles";
import DataCard from "../../ui/DataCard";

interface Props {
  onPaymentSuccess: (id: string, source: string) => void;
}

const CheckoutPayment: React.FC<Props> = ({ onPaymentSuccess }) => {
  const [isReady] = usePaymentSdks();

  const cart = useSelector<typeof reduxStore>(
    (state) => state.cart
  ) as CartState;

  const handleSuccessPayment = (details: any, data: any) => {
    const { orderID, paymentSource } = data;
    onPaymentSuccess(orderID, paymentSource);
  };

  if (typeof window !== "undefined") {
    (window as any).handleSuccessPayment = handleSuccessPayment;
  }

  if (!cart.shipmentAddress) return <Loading />; // still setting state.

  return (
    <Container>
      <PaymentDetails>
        <h2>Details</h2>
        <DataCard
          title="Address"
          fields={[
            { label: "State", value: cart.shipmentAddress.state },
            {
              label: "City",
              value: cart.shipmentAddress.city,
            },
            {
              label: "Neighborhood",
              value: cart.shipmentAddress.neighborhood,
            },
            {
              label: "Postal code",
              value: cart.shipmentAddress.postal_code,
            },
            {
              label: "Street",
              value: cart.shipmentAddress.street,
            },
            {
              label: "Number",
              value: (cart.shipmentAddress as any).number,
            },
          ]}
        />
        <DataCard
          title="Shipment"
          fields={[
            { label: "Service code", value: cart.shipmentMethod!.code },
            { label: "Service name", value: cart.shipmentMethod!.name },
            {
              label: "Deadline",
              value: `${cart.shipmentMethod!.deadline} days`,
            },
            {
              label: "Price",
              value: priceFormmater(cart.shipmentMethod?.value as number),
            },
          ]}
        />
      </PaymentDetails>

      <PaymentMethods>
        <h2>methods</h2>
        {!isReady ? (
          <Loading />
        ) : (
          <Method>
            <PayPalButton
              amount={cart.total / 100}
              currency="BRL"
              onSuccess={handleSuccessPayment}
            />
          </Method>
        )}
      </PaymentMethods>
    </Container>
  );
};

export default CheckoutPayment;
