import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CartState, DefaultState } from "../../../../@types/redux";
import { Address, AddressesState } from "../../../../@types/redux/address";
import { ShipmentCalculatorState } from "../../../../@types/redux/services";
import { listAddress } from "../../../../actions/addressActions";
import { addAddressDataToCart } from "../../../../actions/cartActions";
import { getShipmentMethods } from "../../../../actions/servicesActions";
import { reduxStore } from "../../../../store";
import AddressArticle from "../../../profile/ProfileAddresses/AddressArticle";
import Button from "../../../ui/Button";
import { CheckoutAddressChildProps } from "../CheckoutAddress";

import { Container, AddressList, AddressWrapper, ContinueBox } from "./styles";

const CheckoutAddressList: React.FC<CheckoutAddressChildProps> = ({
  updateShipmentDataCart,
}) => {
  const dispatch = useDispatch();

  const [selectedAddress, setSelectedAddress] = useState<undefined | Address>(
    undefined
  );

  const { addresses } = useSelector<typeof reduxStore>(
    (state) => state.addressList
  ) as AddressesState;

  const {
    success: deletionSuccess,
    error: deletionError,
    reset: deletionReset,
  } = useSelector<typeof reduxStore>(
    (state) => state.addressDelete
  ) as DefaultState;

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

  const { loading: checkoutLoading } = useSelector<typeof reduxStore>(
    (state) => state.checkoutCreate
  ) as DefaultState;

  useEffect(() => {
    dispatch(listAddress());
  }, []);

  useEffect(() => {
    if (deletionSuccess && deletionReset) {
      dispatch(listAddress());
      toast.success("Address deleted successfully");
      dispatch(deletionReset());
    }
  }, [deletionSuccess, deletionReset]);

  useEffect(() => {
    if (deletionError && deletionReset) {
      toast.success(deletionError.message);
      dispatch(deletionReset());
    }
  }, [deletionError, deletionReset]);

  useEffect(() => {
    if (!selectedAddress) return;

    const isSelectedAdressValid = addresses.some(
      (address) => address.id === selectedAddress.id
    );

    if (!isSelectedAdressValid) setSelectedAddress(undefined);
  }, [selectedAddress, addresses]);

  useEffect(() => {
    if (shipmentServicesSuccess && shipmentServicesReset) {
      dispatch(shipmentServicesReset());
      if (selectedAddress) updateShipmentDataCart(selectedAddress);
    }
  }, [shipmentServicesSuccess, shipmentServicesReset]);

  useEffect(() => {
    if (shipmentServicesError && shipmentServicesReset) {
      toast.error(
        `Error (${shipmentServicesError.message}) setting shipment price to postal code: ${shipmentServicesPostalCode}.`
      );
      dispatch(shipmentServicesReset());
    }
  }, [shipmentServicesError, shipmentServicesReset]);

  const handleSelectedAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleContinueCheckout = () => {
    if (!selectedAddress) return;

    if (selectedAddress.postal_code !== cart.shipmentMethod!.postalCode)
      dispatch(getShipmentMethods(selectedAddress.postal_code));
    else dispatch(addAddressDataToCart(selectedAddress));
  };

  return (
    <Container gridSplit={Boolean(selectedAddress)}>
      <AddressList>
        {addresses.map((address) => (
          <AddressWrapper
            key={address.id}
            selected={address.id === selectedAddress?.id}
            onClick={() => handleSelectedAddress(address)}
          >
            <AddressArticle address={address} />
          </AddressWrapper>
        ))}
      </AddressList>
      <ContinueBox>
        {selectedAddress ? (
          <Button
            variant="fill"
            onClick={handleContinueCheckout}
            disabled={shipmentServicesLoading || checkoutLoading}
          >
            CONTINUE
          </Button>
        ) : (
          <p>Select one address to continue</p>
        )}
      </ContinueBox>
    </Container>
  );
};

export default CheckoutAddressList;
