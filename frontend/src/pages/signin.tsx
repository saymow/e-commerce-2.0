import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CustomFC } from "../@types";
import { LoginState } from "../@types/redux/user";
import { login } from "../actions/userActions";
import Layout from "../components/core/Layout";
import Link from "../components/core/Link";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { reduxStore } from "../store";
import { SignInSchema, SignInInitialState } from "../utils/schemas";

const Container = styled.div`
  margin: 1rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  background: var(--bg-Color);

  width: 90%;
  max-width: 34rem;

  padding: 2rem;

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
    if (success && reset) {
      dispatch(reset());
      router.push("/profile");
    }
  }, [success]);

  return (
    <Layout>
      <Container>
        <Formik
          initialValues={SignInInitialState}
          validationSchema={SignInSchema}
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
