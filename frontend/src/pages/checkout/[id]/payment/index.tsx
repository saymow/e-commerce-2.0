import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomFC } from "../../../../@types";
import {
  CheckoutCreateState,
  FilledCartState,
} from "../../../../@types/redux/checkout";
import { toast } from "react-toastify";
import { resetCart, setCheckoutCart } from "../../../../actions/cartActions";
import Layout from "../../../../components/core/Layout";
import api from "../../../../services/api";
import CheckoutLayout from "../../../../components/checkout/CheckoutLayout";
import CheckoutPayment from "../../../../components/checkout/CheckoutPayment";
import { reduxStore } from "../../../../store";
import { finishCheckout } from "../../../../actions/checkoutActions";
import Loading from "../../../../components/ui/Loading";
import CheckoutSuccess from "../../../../components/checkout/CheckoutSuccess";

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

  useEffect(() => {
    if (checkoutCreate.success) dispatch(resetCart());
  }, [checkoutCreate.success]);

  const handlePaymentSuccess = (id: string, source: string) => {
    dispatch(finishCheckout(checkoutId, id, source));
  };

  useEffect(() => {
    if (checkoutCreate.success) toast.success("Order placed successfully!",);
  }, [checkoutCreate.success]);

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
        <CheckoutSuccess />
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
