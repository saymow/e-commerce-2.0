import { GetServerSideProps } from "next";

import React, { useEffect } from "react";
import Layout from "../../../components/core/Layout";
import api from "../../../services/api";

import { Address as AddressType } from "../../../@types/redux/address";
import CheckoutLayout from "../../../components/checkout/CheckoutLayout";
import { FilledCartState, ShipmentData } from "../../../@types/redux/checkout";
import { CustomFC } from "../../../@types";
import { useDispatch } from "react-redux";
import { setCheckoutCart } from "../../../actions/cartActions";
import CheckoutAddress from "../../../components/checkout/CheckoutAddress";
import { listAddress } from "../../../actions/addressActions";

interface Props {
  cart: FilledCartState;
  checkoutId: string;
}

const Address: CustomFC<Props> = ({ cart, checkoutId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCheckoutCart({ ...cart, locked: true }, checkoutId));
  }, []);

  return (
    <Layout>
      <CheckoutLayout
        title="fill the address"
        contentSize="large"
        contentOverflow="hidden"
        detailed
      >
        <CheckoutAddress />
      </CheckoutLayout>
    </Layout>
  );
};

Address.restrictVisibility = "private";

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

export default Address;
