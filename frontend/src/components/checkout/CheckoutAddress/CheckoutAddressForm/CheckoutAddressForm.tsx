import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CartState, DefaultState } from "../../../../@types/redux";
import { Address } from "../../../../@types/redux/address";
import { ShipmentCalculatorState } from "../../../../@types/redux/services";
import { addAddressDataToCart } from "../../../../actions/cartActions";
import { getShipmentMethods } from "../../../../actions/servicesActions";
import { reduxStore } from "../../../../store";
import { POSTAL_CODE_MASK } from "../../../../utils/masks";
import { AddressSchema } from "../../../../utils/schemas";
import { postalCodeWatcher } from "../../../../utils/watchers";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import { CheckoutAddressChildProps } from "../CheckoutAddress";
import { Container, DoubleInputField, Form } from "./styles";

const CheckoutAddressForm: React.FC<CheckoutAddressChildProps> = ({
  updateShipmentDataCart,
}) => {
  const dispatch = useDispatch();

  const [formAddress, setFormAddress] = useState<Address | null>(null);

  const cart = useSelector<typeof reduxStore>(
    (state) => state.cart
  ) as CartState;

  const {
    loading: shipmentServicesLoading,
    error: shipmentServicesError,
    success: shipmentServicesSuccess,
    reset: shipmentServicesReset,
    postalCode: shipmentServicesPostalCode,
  } = useSelector<typeof reduxStore>(
    (state) => state.shipmentCalculator
  ) as ShipmentCalculatorState;

  const { loading: checkoutLoading } = useSelector<typeof reduxStore>(
    (state) => state.checkoutCreate
  ) as DefaultState;

  useEffect(() => {
    if (shipmentServicesSuccess && shipmentServicesReset) {
      dispatch(shipmentServicesReset());
      if (formAddress) updateShipmentDataCart(formAddress);
    }
  }, [shipmentServicesSuccess, shipmentServicesReset]);

  useEffect(() => {
    if (shipmentServicesError && shipmentServicesReset) {
      toast.error(
        `Error (${shipmentServicesError.message}) setting shipment price to postal code: ${shipmentServicesPostalCode}.`
      );
      dispatch(shipmentServicesReset());
      setFormAddress(null);
    }
  }, [shipmentServicesError, shipmentServicesReset]);

  if (!cart.shipmentAddress) return null;

  return (
    <Container>
      <Formik
        initialValues={
          ({
            state: cart.shipmentAddress.state,
            city: cart.shipmentAddress.city,
            neighborhood: cart.shipmentAddress.neighborhood,
            postal_code: cart.shipmentAddress.postal_code,
            street: cart.shipmentAddress.street,
            number: "",
          } as unknown) as Address
        }
        validationSchema={AddressSchema}
        onSubmit={(address) => {
          if (address.postal_code !== cart.shipmentMethod!.postalCode) {
            setFormAddress(address);
            dispatch(getShipmentMethods(address.postal_code));
          } else {
            dispatch(addAddressDataToCart(address));
          }
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Input
              id="postal_code"
              mask={POSTAL_CODE_MASK}
              onBlurWatcher={postalCodeWatcher.bind(formik)}
              placeholder="Postal Code"
            />
            <DoubleInputField invert>
              <Input id="state" placeholder="State" disabled />
              <Input id="city" placeholder="City" disabled />
            </DoubleInputField>
            <Input id="neighborhood" placeholder="Neighborhood" disabled />
            <DoubleInputField>
              <Input id="street" placeholder="Street" />
              <Input
                id="number"
                type="number"
                placeholder="Number"
                min="1"
                max="9999"
              />
            </DoubleInputField>
            <Button
              type="submit"
              variant="fill"
              disabled={shipmentServicesLoading || checkoutLoading}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CheckoutAddressForm;
