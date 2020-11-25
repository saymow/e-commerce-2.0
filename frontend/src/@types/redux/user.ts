import { DefaultState } from ".";

interface UserOnPing {
  id: string;
  name: string;
  email: string;
}

export interface UserOnCreation extends UserOnPing {
  birth_date: string;
  contact_number: string;
}

export interface User extends UserOnCreation {
  is_confirmed: false;
  is_admin: false;
  created_at: string;
  updated_at: string;
}

export interface SessionState extends DefaultState {
  user?: {
    name: string;
    email: string;
  };
  auth?: boolean;
}

export type SessionAction =
  | {
      type: "SESSION_REQUEST";
    }
  | {
      type: "SESSION_SUCCESS";
      payload: {
        name: string;
        email: string;
      };
    }
  | {
      type: "SESSION_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "SESSION_LOGOUT" };

export interface LoginState extends DefaultState {
  user?: {
    name: string;
    email: string;
  };
}

export type LoginAction =
  | {
      type: "USER_LOGIN_REQUEST";
    }
  | {
      type: "USER_LOGIN_SUCCESS";
      payload: {
        name: string;
        email: string;
      };
    }
  | {
      type: "USER_LOGIN_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_LOGIN_RESET" };

export interface RegisterState extends DefaultState {
  user?: {
    name: string;
    email: string;
  };
}

export type RegisterAction =
  | {
      type: "USER_REGISTER_REQUEST";
    }
  | {
      type: "USER_REGISTER_SUCCESS";
      payload: {
        name: string;
        email: string;
      };
    }
  | {
      type: "USER_REGISTER_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_REGISTER_RESET" };

export interface RegisterState extends DefaultState {
  user?: {
    name: string;
    email: string;
  };
}

export interface UserDetailsState extends DefaultState {
  user?: User;
}

export type UserDetailsAction =
  | {
      type: "USER_DETAILS_REQUEST";
    }
  | {
      type: "USER_DETAILS_SUCCESS";
      payload: User;
    }
  | {
      type: "USER_DETAILS_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_DETAILS_RESET" };

export type UserConfirmationAction =
  | {
      type: "USER_CONFIRMATION_MAIL_REQUEST";
    }
  | {
      type: "USER_CONFIRMATION_MAIL_SUCCESS";
    }
  | {
      type: "USER_CONFIRMATION_MAIL_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_CONFIRMATION_MAIL_RESET" };
