import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DefaultState } from "../../../../@types/redux";
import { createAddress, listAddress } from "../../../../actions/addressActions";
import { closeModal } from "../../../../actions/uiActions";
import { reduxStore } from "../../../../store";
import { POSTAL_CODE_MASK } from "../../../../utils/masks";
import { AddressInitialState, AddressSchema } from "../../../../utils/schemas";
import { postalCodeWatcher } from "../../../../utils/watchers";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import { Container, DoubleInputField, Form } from "./styles";

const CreateAddressModel: React.FC = () => {
  const dispatch = useDispatch();

  const {
    loading: creationLoading,
    success: creationSuccess,
    error: creationError,
    reset: creationReset,
  } = useSelector<typeof reduxStore>(
    (state) => state.addressCreate
  ) as DefaultState;

  useEffect(() => {
    if (creationSuccess && creationReset) {
      toast.success("Address created successfully.");
      dispatch(creationReset());
      dispatch(closeModal());
      dispatch(listAddress());
    }
  }, [creationSuccess, creationReset]);

  useEffect(() => {
    if (creationError && creationReset) {
      toast.error("Error on address creation.");
      dispatch(creationReset());
      dispatch(closeModal());
    }
  }, [creationError, creationReset]);

  return (
    <Container>
      <Formik
        initialValues={AddressInitialState}
        validationSchema={AddressSchema}
        onSubmit={(values) => {
          dispatch(createAddress(values as any));
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Input
              id="postal_code"
              mask={POSTAL_CODE_MASK}
              onBlurWatcher={postalCodeWatcher.bind(formik as any)}
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
            <Button type="submit" variant="fill" disabled={creationLoading}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateAddressModel;
