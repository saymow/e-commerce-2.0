import React from "react";
import { useDispatch } from "react-redux";
import { Address } from "../../../../@types/redux/address";
import { deleteAddress } from "../../../../actions/addressActions";
import { openEditAddressModal } from "../../../../actions/uiActions";
import { Container, EditIcon, InfoLine, RemoveIcon } from "./styles";

const AddressArticle: React.FC<{ address: Address }> = ({ address }) => {
  const dispatch = useDispatch();

  const handleAddressDeletion = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;

    dispatch(deleteAddress(id));
  };
  const handleAddressEdition = (id: string) => {
    dispatch(openEditAddressModal(id));
  };

  return (
    <Container>
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
    </Container>
  );
};

export default AddressArticle;
