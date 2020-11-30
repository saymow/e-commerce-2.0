import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DefaultState } from "../../../../@types/redux";
import {
  EditableUser,
  UserDetailsState,
  UserEditState,
} from "../../../../@types/redux/user";
import { closeModal } from "../../../../actions/uiActions";
import { userDetails, userEdit } from "../../../../actions/userActions";
import { reduxStore } from "../../../../store";
import { CONTACT_NUMBER_MASK } from "../../../../utils/masks";
import { EditProfileSchema } from "../../../../utils/schemas";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Loading from "../../../ui/Loading";

import { Container, Form } from "./styles";

const EditUserModal: React.FC = () => {
  const dispatch = useDispatch();

  const [initialState, setInitialState] = useState<EditableUser | null>(null);

  const { user } = useSelector<typeof reduxStore>(
    (state) => state.userDetails
  ) as UserDetailsState;

  const {
    loading: editLoading,
    success: editSuccess,
    successCaveatMessage: editSuccessCaveatMessage,
    error: editError,
    reset: editReset,
  } = useSelector<typeof reduxStore>(
    (state) => state.userEdit
  ) as UserEditState;

  useEffect(() => {
    if (!user) dispatch(userDetails());
    else {
      setInitialState({
        name: user.name,
        email: user.email,
        contact_number: user.contact_number,
      });
    }
  }, []);

  useEffect(() => {
    if (editError && editReset) {
      toast.error(editError.message);
      dispatch(editReset());
    }
  }, [editError, editReset]);

  useEffect(() => {
    if (editSuccess && editReset) {
      dispatch(closeModal());
      dispatch(editReset());
      if (editSuccessCaveatMessage) toast.warning(editSuccessCaveatMessage);
      else toast.success("User profile updated successfully");
    }
  }, [editSuccess, editReset]);

  if (!initialState) return <Loading />;

  return (
    <Container>
      <h1>Edit user Profile</h1>
      <Formik
        initialValues={initialState as any}
        validationSchema={EditProfileSchema}
        onSubmit={(values) => {
          dispatch(userEdit(values));
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Input id="name" placeholder="Name" />
            <Input id="email" placeholder="Email" />
            <Input
              id="contact_number"
              mask={CONTACT_NUMBER_MASK}
              placeholder="Contact number"
            />
            <Button variant="fill" disabled={editLoading}>
              Edit profile
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EditUserModal;
