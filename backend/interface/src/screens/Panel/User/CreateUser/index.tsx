import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { UsersCreateState } from '../../../../@types/redux/user';
import { createUser } from '../../../../actions/userActions';
import Loader from '../../../../components/Loader';
import Message from '../../../../components/Message';
import { ReduxState } from '../../../../store';
import { Container, FormContainer } from './styles';

const CreateUser: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { error, loading, success, reset } = useSelector<typeof ReduxState>(
    state => state.userCreate
  ) as UsersCreateState;

  useEffect(() => {
    if (success && reset) {
      toast.success('User created successfully.');
      history.goBack();
      dispatch(reset());
    }
  }, [success, reset, history, dispatch]);

  useEffect(() => {
    if (error && reset) {
      toast.error(`Ooops we've got an error.`);
      dispatch(reset());
    }
  }, [reset, history, dispatch, error]);

  function handleGoBack() {
    history.goBack();
  }

  return (
    <Container>
      <Button variant="light" size="lg" onClick={handleGoBack}>
        Go back
      </Button>
      <FormContainer>
        {loading ? (
          <Loader />
        ) : (
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              contact_number: '',
              birth_date: '',
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required().max(120).min(3),
              email: Yup.string().required().email(),
              password: Yup.string()
                .required()
                .min(8)
                .matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/), // Minimum eight characters, letter upper and lower case and numbers.
              birth_date: Yup.string()
                .required()
                .matches(/^\d{4}\-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/), // yyyy-mm-dd
              contact_number: Yup.string()
                .required()
                .matches(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/), // (xx) xxxxx-xxxx
            })}
            onSubmit={(data, helpers) => {
              dispatch(createUser(data));
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

                <Form.Group controlId="password">
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
                </Form.Group>

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

                <Form.Group controlId="birth_date">
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
                </Form.Group>

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

export default CreateUser;
