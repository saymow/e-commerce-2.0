import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { CustomFC } from "../@types";
import { RegisterState } from "../@types/redux/user";
import { register } from "../actions/userActions";
import Layout from "../components/core/Layout";
import Link from "../components/core/Link";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { reduxStore } from "../store";
import { CONTACT_NUMBER_MASK } from "../utils/masks";
import { SignUpSchema, SignUpInitialState } from "../utils/schemas";

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

const SignUp: CustomFC = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const [redirect, setRedirect] = useState<string | undefined>();

  const { loading, success, error, reset } = useSelector<typeof reduxStore>(
    (state) => state.userRegister
  ) as RegisterState;

  useEffect(() => {
    const { redirect: routerRedirect } = router.query;
    if (routerRedirect) setRedirect(routerRedirect as string);
  }, [router]);

  useEffect(() => {
    if (error && reset) {
      toast.error(error.message);
      dispatch(reset());
    }
  }, [error, reset]);

  useEffect(() => {
    if (success) router.push(redirect ? `/${redirect}` : "/profile");
  }, [success]);

  return (
    <Layout>
      <Container>
        <Formik
          initialValues={SignUpInitialState}
          validationSchema={SignUpSchema}
          onSubmit={(values) => {
            dispatch(register(values));
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <h1>Register</h1>
              <Input id="email" placeholder="Email address" type="email" />
              <Input id="name" placeholder="Name" />
              <Input id="password" type="password" placeholder="Password" />
              <Input
                id="passwordConfirmation"
                type="password"
                placeholder="Password confirmation"
              />
              <Input id="birth_date" type="date" placeholder="Birth date" />
              <Input
                id="contact_number"
                placeholder="Contact number"
                mask={CONTACT_NUMBER_MASK}
              />
              <Button variant="fill" disabled={loading}>
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
        <Link href={redirect ? `/signin?redirect=${redirect}` : "/signin"}>
          Sign in
        </Link>
      </Container>
    </Layout>
  );
};

SignUp.restrictVisibility = "public";

export default SignUp;
