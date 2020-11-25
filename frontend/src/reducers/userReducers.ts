import { DefaultState } from "../@types/redux";
import {
  RegisterAction,
  RegisterState,
  LoginAction,
  LoginState,
  SessionAction,
  SessionState,
  UserDetailsState,
  UserDetailsAction,
  UserConfirmationAction,
} from "../@types/redux/user";

export const userSessionReducer = (
  state: SessionState = { loading: true },
  action: SessionAction
): SessionState => {
  switch (action.type) {
    case "SESSION_REQUEST":
      return { ...state, loading: true };
    case "SESSION_SUCCESS": {
      const { email, name } = action.payload;
      return { ...state, loading: false, user: { email, name }, auth: true };
    }
    case "SESSION_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "SESSION_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const userLoginReducer = (
  state: LoginState = {},
  action: LoginAction
): LoginState => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return {
        loading: true,
        reset: () => ({ type: "USER_LOGIN_RESET" }),
      };
    case "USER_LOGIN_SUCCESS": {
      const { email, name } = action.payload;
      return { ...state, loading: false, user: { email, name }, success: true };
    }
    case "USER_LOGIN_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_LOGIN_RESET":
      console.log("reseting user login");
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (
  state: RegisterState = {},
  action: RegisterAction
): RegisterState => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return {
        loading: true,
        reset: () => ({ type: "USER_REGISTER_RESET" }),
      };
    case "USER_REGISTER_SUCCESS": {
      const { email, name } = action.payload;
      return { ...state, loading: false, user: { email, name }, success: true };
    }
    case "USER_REGISTER_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_REGISTER_RESET":
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (
  state: UserDetailsState = { loading: true },
  action: UserDetailsAction
): UserDetailsState => {
  switch (action.type) {
    case "USER_DETAILS_REQUEST":
      return {
        loading: true,
        reset: () => ({ type: "USER_DETAILS_RESET" }),
      };
    case "USER_DETAILS_SUCCESS": {
      const user = action.payload;
      return { ...state, user, loading: false, success: true };
    }
    case "USER_DETAILS_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_DETAILS_RESET":
      return {};
    default:
      return state;
  }
};

export const userConfirmationReducer = (
  state: DefaultState = {},
  action: UserConfirmationAction
): DefaultState => {
  switch (action.type) {
    case "USER_CONFIRMATION_MAIL_REQUEST":
      return {
        loading: true,
        reset: () => ({ type: "USER_CONFIRMATION_MAIL_RESET" }),
      };
    case "USER_CONFIRMATION_MAIL_SUCCESS": {
      return { ...state, loading: false, success: true };
    }
    case "USER_CONFIRMATION_MAIL_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_CONFIRMATION_MAIL_RESET":
      return {};
    default:
      return state;
  }
};
