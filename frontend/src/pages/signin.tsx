import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as Yup from "yup";
import { CustomFC } from "../@types";
import { LoginState } from "../@types/redux";
import { login } from "../actions/userActions";
import Layout from "../components/core/Layout";
import Link from "../components/core/Link";
import { WithRestriction } from "../components/hocs";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { reduxStore } from "../store";

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string()
    .required()
    .min(8)
    .matches(
      /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/,
      "Password must contain upper and lowercase letters and numbers."
    ), // Minimum eight characters, letter upper and lower case and numbers.
});

const Container = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  width: 90%;
  max-width: 30rem;

  padding: 1rem;

  h1 {
    margin-bottom: 2rem;
    font-size: 3rem;
  }

  button {
    margin-top: 3rem;
  }
`;

export const SignupLink = styled.div`
  color: var(--secondary-Color);
`;

const SignIn: CustomFC = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { error, loading, reset, success } = useSelector<typeof reduxStore>(
    (state) => state.userLogin
  ) as LoginState;

  useEffect(() => {
    if (error && reset) {
      toast.error(error.message);
      dispatch(reset());
    }
  }, [error]);

  useEffect(() => {
    if (success) router.push("/profile");
  }, [success]);

  return (
    <Layout>
      <Container>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            const { email, password } = values;

            dispatch(login(email, password));
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <h1>Login</h1>
              <Input id="email" type="text" placeholder="Email" />
              <Input id="password" type="password" placeholder="Password" />
              <Button type="submit" variant="fill" disabled={loading}>
                Sign in
              </Button>
            </Form>
          )}
        </Formik>
        <SignupLink>
          <Link href="/signup"> Try out Sign up.</Link>
        </SignupLink>
      </Container>
    </Layout>
  );
};

SignIn.restrictVisibility = "public";

export default SignIn;
