import { DefaultState } from ".";

export interface FetchedAddress {
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  postal_code: string;
}

export interface GivenAddress extends FetchedAddress {
  number: number;
}

export interface Address extends GivenAddress {
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

export type AddressEditionAction =
  | {
      type: "USER_ADDRESS_EDIT_REQUEST";
    }
  | {
      type: "USER_ADDRESS_EDIT_SUCCESS";
    }
  | {
      type: "USER_ADDRESS_EDIT_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_ADDRESS_EDIT_RESET" };

export interface AddressShowState extends DefaultState {
  address?: Address;
}

export type AddressShowAction =
  | {
      type: "USER_ADDRESS_SHOW_REQUEST";
    }
  | {
      type: "USER_ADDRESS_SHOW_SUCCESS";
      payload: Address;
    }
  | {
      type: "USER_ADDRESS_SHOW_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_ADDRESS_SHOW_RESET" };
