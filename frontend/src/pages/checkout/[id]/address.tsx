import { GetServerSideProps } from "next";

import React from "react";
import Layout from "../../../components/core/Layout";
import api from "../../../services/api";

import { Address as AddressType } from "../../../@types/redux/address";
import CheckoutLayout from "../../../components/checkout/CheckoutLayout";
import { ShipmentData } from "../../../@types/redux/checkout";
import { CustomFC } from "../../../@types";

// import { Container } from './styles';

interface Props {
  addresses: AddressType;
  shipmentMethod: ShipmentData;
}

const Address: CustomFC<Props> = ({ addresses, shipmentMethod }) => {
  console.log(addresses, shipmentMethod);

  return (
    <Layout>
      <CheckoutLayout title="addresses"></CheckoutLayout>
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
      data: { shipmentMethod },
    } = await api.get(`/checkout/${checkoutId}/shipment`, authHeader);

    return {
      props: {
        addresses: addressesData,
        shipmentMethod: shipmentMethod,
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
