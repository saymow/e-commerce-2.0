import {
  Address,
  AddressCreationAction,
  AddressDeletionAction,
  AddressEditionAction,
  AddressesAction,
  AddressShowAction,
  GivenAddress,
} from "../@types/redux/address";
import api from "../services/api";

export const listAddress = () => async (
  dispatch: (arg0: AddressesAction) => void
) => {
  try {
    dispatch({
      type: "USER_ADDRESSES_REQUEST",
    });

    const { data } = await api.get("/addresses");

    dispatch({ type: "USER_ADDRESSES_SUCCESS", payload: data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_ADDRESSES_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const deleteAddress = (id: string) => async (
  dispatch: (arg0: AddressDeletionAction) => void
) => {
  try {
    dispatch({
      type: "USER_ADDRESS_DELETE_REQUEST",
    });

    await api.delete(`/addresses/${id}`);

    dispatch({ type: "USER_ADDRESS_DELETE_SUCCESS" });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_ADDRESS_DELETE_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const createAddress = (data: GivenAddress) => async (
  dispatch: (arg0: AddressCreationAction) => void
) => {
  try {
    dispatch({
      type: "USER_ADDRESS_CREATE_REQUEST",
    });

    await api.post(`/addresses`, data);

    dispatch({ type: "USER_ADDRESS_CREATE_SUCCESS" });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_ADDRESS_CREATE_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const showAddress = (id: string) => async (
  dispatch: (arg0: AddressShowAction) => void
) => {
  try {
    dispatch({
      type: "USER_ADDRESS_SHOW_REQUEST",
    });

    const { data } = await api.get(`/addresses/${id}`);

    const serializedAddress = {
      ...data,
      number: parseInt(data.number),
    };

    dispatch({ type: "USER_ADDRESS_SHOW_SUCCESS", payload: serializedAddress });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_ADDRESS_SHOW_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const editAddress = (data: Address) => async (
  dispatch: (arg0: AddressEditionAction) => void
) => {
  try {
    dispatch({
      type: "USER_ADDRESS_EDIT_REQUEST",
    });

    await api.put(`/addresses/${data.id}`, data);

    dispatch({ type: "USER_ADDRESS_EDIT_SUCCESS" });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_ADDRESS_EDIT_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};
