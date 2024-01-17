import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomFC } from "../../../@types";
import {
  CheckoutCreateState,
  FilledCartState,
} from "../../../@types/redux/checkout";
import { setCheckoutCart } from "../../../actions/cartActions";
import Layout from "../../../components/core/Layout";
import api from "../../../services/api";
import CheckoutLayout from "../../../components/checkout/CheckoutLayout";
import CheckoutPayment from "../../../components/checkout/CheckoutPayment";
import { reduxStore } from "../../../store";
import { CartState } from "../../../@types/redux";
import { finishCheckout } from "../../../actions/checkoutActions";
import Loading from "../../../components/ui/Loading";

interface Props {
  cart: FilledCartState;
  checkoutId: string;
}

const Payment: CustomFC<Props> = ({ cart, checkoutId }) => {
  const dispatch = useDispatch();

  const checkoutCreate = useSelector<typeof reduxStore>(
    (state) => state.checkoutCreate
  ) as CheckoutCreateState;

  useEffect(() => {
    dispatch(setCheckoutCart({ ...cart, locked: true }, checkoutId));
  }, []);

  const handlePaymentSuccess = (id: string, source: string) => {
    dispatch(finishCheckout(checkoutId, id, source));
  };

  if (checkoutCreate.loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  if (checkoutCreate.success) {
    return (
      <Layout>
        <p>Todo: Order placed succesfuly</p>
      </Layout>
    );
  }

  if (checkoutCreate.error) {
    return (
      <Layout>
        <p>Todo: Order failed</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <CheckoutLayout title="payment" contentSize="large" detailed>
        <CheckoutPayment onPaymentSuccess={handlePaymentSuccess} />
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
