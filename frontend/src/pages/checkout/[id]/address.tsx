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

interface Props {
  addresses: AddressType;
  cart: FilledCartState;
}

const Address: CustomFC<Props> = ({ addresses, cart }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCheckoutCart({ ...cart, locked: true }));
  }, []);

  return (
    <Layout>
      <CheckoutLayout
        title="addresses"
        contentSize="large"
        detailed
      ></CheckoutLayout>
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

    const { data: addressesData } = await api.get("/addresses", authHeader);

    const {
      data: { cart },
    } = await api.get(`/checkout/${checkoutId}`, authHeader);

    return {
      props: {
        addresses: addressesData,
        cart,
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
