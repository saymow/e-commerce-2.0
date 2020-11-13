import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { UsersEditState, UsersShowState } from '../../../../@types/redux/user';
import { toast } from 'react-toastify';

import { editUser, showUser } from '../../../../actions/userActions';
import Loader from '../../../../components/Loader';
import Message from '../../../../components/Message';
import { ReduxState } from '../../../../store';
import { Container, FormContainer } from './styles';

const EditUser: React.FC = () => {
  const { id } = useParams() as { id: string };

  const history = useHistory();
  const dispatch = useDispatch();

  const { loading: userShowLoading, error: userShowError, user } = useSelector<
    typeof ReduxState
  >(state => state.userShow) as UsersShowState;

  const {
    loading: userEditLoading,
    error: userEditError,
    success: userEditSuccess,
    reset: userEditReset,
  } = useSelector<typeof ReduxState>(state => state.userEdit) as UsersEditState;

  useEffect(() => {
    if (userEditSuccess && userEditReset) {
      toast.success('User updated successfully.');
      history.goBack();
      dispatch(userEditReset());
    }
  }, [userEditSuccess, userEditReset, history, dispatch]);

  useEffect(() => {
    if (userEditError && userEditReset) {
      toast.error(userEditError.message);
      dispatch(userEditReset());
    }
  }, [userEditSuccess, userEditReset, history, dispatch, userEditError]);

  useEffect(() => {
    dispatch(showUser(id));
  }, [dispatch, id]);

  function handleGoBack() {
    history.goBack();
  }

  return (
    <Container>
      <Button variant="light" size="lg" onClick={handleGoBack}>
        Go back
      </Button>
      <FormContainer>
        {userShowLoading || userEditLoading ? (
          <Loader />
        ) : userShowError ? (
          <Message>{userShowError?.message}</Message>
        ) : (
          <Formik
            initialValues={{
              name: user?.name,
              email: user?.email,
              contact_number: user?.contact_number,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required().max(120).min(3),
              email: Yup.string().required().email(),
              contact_number: Yup.string()
                .required()
                .matches(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/), // (xx) xxxxx-xxxx
            })}
            onSubmit={(data, helpers) => {
              dispatch(editUser(data, id));
            }}
          >
            {formik => (
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="User's name"
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {formik.errors.name}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="User's email"
                    type="email"
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {/* <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    placeholder="User's password"
                    type="password"
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  )}
                </Form.Group> */}

                <Form.Group controlId="contact_number">
                  <Form.Label>Contact number</Form.Label>
                  <Form.Control
                    placeholder="User's Contact number"
                    {...formik.getFieldProps('contact_number')}
                  />
                  {formik.touched.contact_number &&
                    formik.errors.contact_number && (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {formik.errors.contact_number}
                      </Form.Control.Feedback>
                    )}
                </Form.Group>

                {/* <Form.Group controlId="birth_date">
                  <Form.Label>Birth date</Form.Label>
                  <Form.Control
                    placeholder="User's Birth date"
                    type="date"
                    {...formik.getFieldProps('birth_date')}
                  />
                  {formik.touched.birth_date && formik.errors.birth_date && (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {formik.errors.birth_date}
                    </Form.Control.Feedback>
                  )}
                </Form.Group> */}

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </FormContainer>
    </Container>
  );
};

export default EditUser;
