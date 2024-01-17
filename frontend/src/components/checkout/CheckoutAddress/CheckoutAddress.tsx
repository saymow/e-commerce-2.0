import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CartState, DefaultState } from "../../../@types/redux";
import { Address } from "../../../@types/redux/address";
import { FilledCartState, ShipmentData } from "../../../@types/redux/checkout";
import { ShipmentCalculatorState } from "../../../@types/redux/services";
import {
  addAddressDataToCart,
  addShipmmentDataToCart,
} from "../../../actions/cartActions";
import { updateCheckout } from "../../../actions/checkoutActions";
import { reduxStore } from "../../../store";
import CheckoutAddressForm from "./CheckoutAddressForm";
import CheckoutAddressList from "./CheckoutAddressList";
import { Container, Label, PrimaryView } from "./styles";

export interface CheckoutAddressChildProps {
  updateShipmentDataCart: (address: Address) => void;
}

const CheckoutAddress: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [views, setViews] = useState({
    primary: {
      title: "address form",
      Component: (
        <CheckoutAddressForm updateShipmentDataCart={updateShipmentDataCart} />
      ),
    },
    secondary: {
      title: "addresses list",
      Component: (
        <CheckoutAddressList updateShipmentDataCart={updateShipmentDataCart} />
      ),
    },
  });

  const cart = useSelector<typeof reduxStore>(
    (state) => state.cart
  ) as CartState;

  const {
    services: shipmentServices,
    loading: shipmentServicesLoading,
    error: shipmentServicesError,
    success: shipmentServicesSuccess,
    reset: shipmentServicesReset,
    postalCode: shipmentServicesPostalCode,
  } = useSelector<typeof reduxStore>(
    (state) => state.shipmentCalculator
  ) as ShipmentCalculatorState;

  const {
    loading: checkoutLoading,
    success: checkoutSuccess,
    reset: checkoutReset,
    error: checkoutError,
  } = useSelector<typeof reduxStore>(
    (state) => state.checkoutCreate
  ) as DefaultState;

  function updateShipmentDataCart(address: Address) {
    const choosenMethod = shipmentServices.find(
      (method) => method.code === cart.shipmentMethod!.code
    );

    if (choosenMethod?.error && shipmentServicesReset) {
      toast.error(
        `Error (${choosenMethod?.error.message}) setting shipment price to postal code: ${shipmentServicesPostalCode}.`
      );
      dispatch(shipmentServicesReset());
      return;
    }

    const newShipmentMethod = {
      ...choosenMethod,
      postalCode: shipmentServicesPostalCode,
    };

    dispatch(addShipmmentDataToCart(newShipmentMethod as ShipmentData));
    dispatch(addAddressDataToCart(address));
    toast.success(
      `Shipment prices updated to postal code: ${shipmentServicesPostalCode}.`
    );
  }

  useEffect(() => {
    if (!cart.shipmentAddress || !cart.shipmentMethod) return;

    let addressKeys = [
      "state",
      "city",
      "neighborhood",
      "postal_code",
      "street",
      "number",
    ];

    let shipmentMethodKeys = [
      "name",
      "value",
      "code",
      "deadline",
      "postalCode",
    ];

    let isValidAddress = addressKeys.every(
      (key) => (cart.shipmentAddress as any)[key]
    );

    let isShipmentMethod = shipmentMethodKeys.every(
      (key) => (cart.shipmentMethod as any)[key]
    );

    if (isValidAddress && isShipmentMethod) {
      dispatch(
        updateCheckout(
          cart as FilledCartState,
          cart.checkoutId as string
        )
      );
    }
  }, [cart.shipmentAddress, cart.shipmentMethod]);

  useEffect(() => {
    if (checkoutSuccess && checkoutReset) {
      dispatch(checkoutReset());
      router.push(`/checkout/${cart.checkoutId}/payment`);
    }
  }, [checkoutSuccess, checkoutReset]);

  useEffect(() => {
    if (checkoutError && checkoutReset) {
      toast.error(`Checkout error: ${checkoutError.message}`);
      dispatch(checkoutReset());
    }
  }, [checkoutError, checkoutReset]);

  const handleSwitchView = () => {
    setViews({
      primary: views.secondary,
      secondary: views.primary,
    });
  };

  return (
    <Container>
      <PrimaryView>
        <Label onClick={handleSwitchView}>
          <span>switch to {views.secondary.title}</span> <div />
        </Label>
        {views.primary.Component}
      </PrimaryView>
    </Container>
  );
};

export default CheckoutAddress;
