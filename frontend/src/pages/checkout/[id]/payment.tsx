import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CustomFC } from "../../../@types";
import { FilledCartState } from "../../../@types/redux/checkout";
import { setCheckoutCart } from "../../../actions/cartActions";
import Layout from "../../../components/core/Layout";
import api from "../../../services/api";
import CheckoutLayout from "../../../components/checkout/CheckoutLayout";
import CheckoutPayment from "../../../components/checkout/CheckoutPayment";

interface Props {
  cart: FilledCartState;
  checkoutId: string;
}

const Payment: CustomFC<Props> = ({ cart, checkoutId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCheckoutCart({ ...cart, locked: true }, checkoutId));
  }, []);

  return (
    <Layout>
      <CheckoutLayout title="payment" contentSize="large" detailed>
        <CheckoutPayment />
      </CheckoutLayout>
    </Layout>
  );
};

Payment.restrictVisibility = "private";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  try {
    let cookie = req.headers.cookie;
    const checkoutId = (params as any).id;

    let authHeader = {
      headers: {
        Cookie: cookie,
      },
      withCredentials: true,
    };

    const {
      data: { cart },
    } = await api.get(`/checkout/${checkoutId}`, authHeader);

    return {
      props: {
        cart,
        checkoutId,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/signin",
        permanent: true,
      },
    };
  }
};

export default Payment;
