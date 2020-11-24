import { DefaultState } from ".";

export interface SessionState extends DefaultState {
  user?: {
    name: string;
    email: string;
  };
  auth?: boolean;
}

export type SessionAction =
  | {
      type: "SESSION-REQUEST";
    }
  | {
      type: "SESSION-SUCCESS";
      payload: {
        name: string;
        email: string;
      };
    }
  | {
      type: "SESSION-FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "SESSION-LOGOUT" };

export interface LoginState extends DefaultState {
  user?: {
    name: string;
    email: string;
  };
}

export type LoginAction =
  | {
      type: "USER_LOGIN-REQUEST";
    }
  | {
      type: "USER_LOGIN-SUCCESS";
      payload: {
        name: string;
        email: string;
      };
    }
  | {
      type: "USER_LOGIN-FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_LOGIN-RESET" };

export interface RegisterState extends DefaultState {
  user?: {
    name: string;
    email: string;
  };
}

export type RegisterAction =
  | {
      type: "USER_REGISTER-REQUEST";
    }
  | {
      type: "USER_REGISTER-SUCCESS";
      payload: {
        name: string;
        email: string;
      };
    }
  | {
      type: "USER_REGISTER-FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_REGISTER-RESET" };
