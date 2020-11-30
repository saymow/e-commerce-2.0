import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import React from "react";
import { toast } from "react-toastify";
import localApi from "../../../../services/localApi";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import { Container, Form, DoubleInputField } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createAddress, listAddress } from "../../../../actions/addressActions";
import { DefaultState } from "../../../../@types/redux";
import { reduxStore } from "../../../../store";
import { useEffect } from "react";
import { closeModal } from "../../../../actions/uiActions";

const initialState = {
  state: "",
  city: "",
  neighborhood: "",
  postal_code: "",
  street: "",
  number: "",
};

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

  async function postalCodeWatcher(
    this: FormikProps<typeof initialState>,
    e: React.FocusEvent<HTMLInputElement>,
    error: string | undefined
  ) {
    try {
      if (error) return;
      const postalCode = e.target.value;

      const { data } = await localApi.get(`/location/${postalCode}`);

      for (const property in data) this.setFieldValue(property, data[property]);
    } catch (err) {
      toast.error(`Error on getting location: Cep not found.`);
      this.setErrors({ postal_code: "Invalid postal code" });
      this.resetForm();
    }
  }

  return (
    <Container>
      <Formik
        initialValues={initialState}
        validationSchema={Yup.object().shape({
          state: Yup.string().required(),
          city: Yup.string().required(),
          neighborhood: Yup.string().required(),
          postal_code: Yup.string()
            .matches(/(\d{5})(-{1})(\d{3})/, "Invalid format")
            .required(),
          street: Yup.string().required(),
          number: Yup.number().required(),
        })}
        onSubmit={(values) => {
          dispatch(createAddress(values));
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Input
              id="postal_code"
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
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
