import { DefaultState } from ".";

export interface GivenAddress {
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  postal_code: string;
  number: string;
}

interface Address extends GivenAddress {
  id: string;
}

export interface AddressesState extends DefaultState {
  addresses: Address[];
}

export type AddressesAction =
  | {
      type: "USER_ADDRESSES_REQUEST";
    }
  | {
      type: "USER_ADDRESSES_SUCCESS";
      payload: Address[];
    }
  | {
      type: "USER_ADDRESSES_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_ADDRESSES_RESET" };

export type AddressDeletionAction =
  | {
      type: "USER_ADDRESS_DELETE_REQUEST";
    }
  | {
      type: "USER_ADDRESS_DELETE_SUCCESS";
    }
  | {
      type: "USER_ADDRESS_DELETE_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_ADDRESS_DELETE_RESET" };

export type AddressCreationAction =
  | {
      type: "USER_ADDRESS_CREATE_REQUEST";
    }
  | {
      type: "USER_ADDRESS_CREATE_SUCCESS";
    }
  | {
      type: "USER_ADDRESS_CREATE_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_ADDRESS_CREATE_RESET" };
