import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DefaultState } from "../../../@types/redux";
import { AddressesState } from "../../../@types/redux/address";
import { listAddress } from "../../../actions/addressActions";
import { openCreateAddressModal } from "../../../actions/uiActions";
import { reduxStore } from "../../../store";
import Loading from "../../ui/Loading";
import AddressArticle from "./AddressArticle";
import { Container, CreateAddress, PlusIcon } from "./styles";

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

  const handleAddressCreation = () => {
    dispatch(openCreateAddressModal());
  };

  if (loading) return <Loading />;

  return (
    <Container>
      {addresses.map((address) => (
        <AddressArticle key={address.id} address={address} />
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
