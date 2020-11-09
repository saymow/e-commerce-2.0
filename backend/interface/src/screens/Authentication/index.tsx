import React from 'react';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';

import { Container, FormWrapper } from './styles';
import { useDispatch, useSelector } from 'react-redux';

import { userLogin } from '../../actions/userActions';
import { ReduxState } from '../../store';

const Authentication: React.FC = () => {
  const dispatch = useDispatch();

  const { error } = useSelector<typeof ReduxState>(
    state => state.userLogin
  ) as any;

  return (
    <Container>
      <FormWrapper>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().required().email(),
            password: Yup.string()
              .required()
              .min(8)
              .matches(
                /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/,
                'Password must contain upper and lowercase letters and numbers'
              ),
          })}
          onSubmit={({ email, password }, helpers) => {
            dispatch(userLogin(email, password));
          }}
        >
          {formik => (
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
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
                  type="password"
                  placeholder="Password"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password && (
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              {error && <p>{error.message}</p>}
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </Container>
  );
};

export default Authentication;
