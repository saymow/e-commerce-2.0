import { DefaultState } from "../@types/redux";
import {
  AddressesState,
  AddressesAction,
  AddressDeletionAction,
  AddressCreationAction,
} from "../@types/redux/address";

export const addressListReducer = (
  state: AddressesState = { addresses: [] },
  action: AddressesAction
): AddressesState => {
  switch (action.type) {
    case "USER_ADDRESSES_REQUEST": {
      return { ...state, loading: true };
    }
    case "USER_ADDRESSES_SUCCESS": {
      const addresses = action.payload;
      return { ...state, addresses, loading: false, success: true };
    }
    case "USER_ADDRESSES_FAIL": {
      return { ...state, loading: false, error: action.payload };
    }
    case "USER_ADDRESSES_RESET":
      return { addresses: [] };
    default:
      return state;
  }
};

export const addressDeleteReducer = (
  state: DefaultState = {},
  action: AddressDeletionAction
): DefaultState => {
  switch (action.type) {
    case "USER_ADDRESS_DELETE_REQUEST": {
      return {
        ...state,
        loading: true,
        reset: () => ({ type: "USER_ADDRESS_DELETE_RESET" }),
      };
    }
    case "USER_ADDRESS_DELETE_SUCCESS": {
      return { ...state, loading: false, success: true };
    }
    case "USER_ADDRESS_DELETE_FAIL": {
      return { ...state, loading: false, error: action.payload };
    }
    case "USER_ADDRESS_DELETE_RESET":
      return {};
    default:
      return state;
  }
};

export const addressCreateReducer = (
  state: DefaultState = {},
  action: AddressCreationAction
): DefaultState => {
  switch (action.type) {
    case "USER_ADDRESS_CREATE_REQUEST": {
      return {
        ...state,
        loading: true,
        reset: () => ({ type: "USER_ADDRESS_CREATE_RESET" }),
      };
    }
    case "USER_ADDRESS_CREATE_SUCCESS": {
      return { ...state, loading: false, success: true };
    }
    case "USER_ADDRESS_CREATE_FAIL": {
      return { ...state, loading: false, error: action.payload };
    }
    case "USER_ADDRESS_CREATE_RESET":
      return {};
    default:
      return state;
  }
};
