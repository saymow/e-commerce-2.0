import React from "react";
import { Formik } from "formik";

import { Container, Form, DoubleInputField } from "./styles";
import Input from "../../../ui/Input";
import { POSTAL_CODE_MASK } from "../../../../utils/masks";
import { postalCodeWatcher } from "../../../../utils/watchers";
import Button from "../../../ui/Button";
import { Address } from "../../../../@types/redux/address";
import { AddressSchema } from "../../../../utils/schemas";
import { useSelector } from "react-redux";
import { CartState } from "../../../../@types/redux";
import { reduxStore } from "../../../../store";
import { SuccessPostalCodeServiceResponse } from "../../../../@types/redux/services";
import { ShipmentData } from "../../../../@types/redux/checkout";

const CheckoutAddressForm: React.FC = () => {
  const cart = useSelector<typeof reduxStore>(
    (state) => state.cart
  ) as CartState;

  if (!cart.shipmentAddress) return null;

  return (
    <Container>
      <Formik
        initialValues={
          {
            postal_code: cart.shipmentAddress.postal_code,
            state: cart.shipmentAddress.state,
            city: cart.shipmentAddress.city,
            neighborhood: cart.shipmentAddress.neighborhood,
            street: cart.shipmentAddress.street,
            number: "",
          } as Address
        }
        validationSchema={AddressSchema}
        onSubmit={(values) => {
          console.log(values);
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
            <Button type="submit" variant="fill">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CheckoutAddressForm;
