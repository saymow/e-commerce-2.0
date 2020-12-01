import { Formik, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import localApi from "../../../../services/localApi";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import { AddressInitialState, AddressSchema } from "../../../../utils/schemas";
import { Container, DoubleInputField, Form } from "./styles";
import { POSTAL_CODE_MASK } from "../../../../utils/masks";
import { useDispatch, useSelector } from "react-redux";
import { DefaultState, ModalState } from "../../../../@types/redux";
import { reduxStore } from "../../../../store";
import { closeModal } from "../../../../actions/uiActions";
import {
  editAddress,
  listAddress,
  showAddress,
} from "../../../../actions/addressActions";
import {
  AddressShowAction,
  AddressShowState,
} from "../../../../@types/redux/address";
import Loading from "../../../ui/Loading";
import { postalCodeWatcher } from "../../../../utils/watchers";

const EditAddressModal: React.FC = () => {
  const dispatch = useDispatch();

  const { entityId } = useSelector<typeof reduxStore>(
    (state) => state.modal
  ) as ModalState;

  const {
    address,
    loading: showLoading,
    error: showError,
    reset: showReset,
  } = useSelector<typeof reduxStore>(
    (state) => state.addressShow
  ) as AddressShowState;

  const {
    loading: editLoading,
    error: editError,
    reset: editReset,
    success: editSuccess,
  } = useSelector<typeof reduxStore>(
    (state) => state.addressEdit
  ) as DefaultState;

  useEffect(() => {
    if (!entityId) dispatch(closeModal());
    else dispatch(showAddress(entityId));
  }, [entityId]);

  useEffect(() => {
    if (showError && showReset) {
      toast.error(showError.message);
      dispatch(showReset());
      dispatch(closeModal());
    }
  }, [address, showError, showLoading]);

  useEffect(() => {
    if (editError && editReset) {
      toast.error(editError.message);
      dispatch(editReset());
    }
  }, [address, editError, editLoading]);

  useEffect(() => {
    if (editSuccess && editReset) {
      toast.success("Address updated successfully");
      dispatch(editReset());
      dispatch(listAddress());
      dispatch(closeModal());
    }
  }, [address, editSuccess, editLoading]);

  if (showLoading || !address) return <Loading />;

  return (
    <Container>
      <Formik
        initialValues={{ ...address } as typeof AddressInitialState}
        validationSchema={AddressSchema}
        onSubmit={(values) => {
          dispatch(editAddress(values));
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
            <Button type="submit" variant="fill" disabled={editLoading}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EditAddressModal;
