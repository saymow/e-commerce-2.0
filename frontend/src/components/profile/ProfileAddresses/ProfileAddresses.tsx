import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DefaultState } from "../../../@types/redux";
import { AddressesState } from "../../../@types/redux/address";
import { deleteAddress, listAddress } from "../../../actions/addressActions";
import {
  openCreateAddressModal,
  openEditAddressModal,
} from "../../../actions/uiActions";
import { reduxStore } from "../../../store";
import Loading from "../../ui/Loading";

import {
  Container,
  Address,
  InfoLine,
  RemoveIcon,
  EditIcon,
  CreateAddress,
  PlusIcon,
} from "./styles";

const ProfileAddresses: React.FC = () => {
  const dispatch = useDispatch();

  const { addresses, loading } = useSelector<typeof reduxStore>(
    (state) => state.addressList
  ) as AddressesState;

  const {
    success: deletionSuccess,
    error: deletionError,
    reset: deletionReset,
  } = useSelector<typeof reduxStore>(
    (state) => state.addressDelete
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

  const handleAddressDeletion = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;

    dispatch(deleteAddress(id));
  };

  const handleAddressCreation = () => {
    dispatch(openCreateAddressModal());
  };

  const handleAddressEdition = (id: string) => {
    dispatch(openEditAddressModal(id));
  };

  if (loading) return <Loading />;

  return (
    <Container>
      {addresses.map((address) => (
        <Address key={address.id}>
          <InfoLine>
            <strong>State</strong>: {address.state}
          </InfoLine>
          <InfoLine>
            <strong>City</strong>: {address.city}
          </InfoLine>
          <InfoLine>
            <strong>Neighborhood</strong>: {address.neighborhood}
          </InfoLine>
          <InfoLine>
            <strong>Postal code</strong>: {address.postal_code}
          </InfoLine>
          <InfoLine>
            <strong>Street</strong>: {address.street}
          </InfoLine>
          <InfoLine>
            <strong>Number</strong>: {address.number}
          </InfoLine>
          <EditIcon onClick={() => handleAddressEdition(address.id)} />
          <RemoveIcon onClick={() => handleAddressDeletion(address.id)} />
        </Address>
      ))}
      <CreateAddress>
        <div onClick={handleAddressCreation}>
          <PlusIcon />
        </div>
      </CreateAddress>
    </Container>
  );
};

export default ProfileAddresses;
