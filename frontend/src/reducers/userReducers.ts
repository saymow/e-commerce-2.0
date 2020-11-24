import {
  RegisterAction,
  RegisterState,
  LoginAction,
  LoginState,
  SessionAction,
  SessionState,
} from "../@types/redux/user";

export const userSessionReducer = (
  state: SessionState = { loading: true },
  action: SessionAction
): SessionState => {
  switch (action.type) {
    case "SESSION-REQUEST":
      return { ...state, loading: true };
    case "SESSION-SUCCESS": {
      const { email, name } = action.payload;
      return { ...state, loading: false, user: { email, name } };
    }
    case "SESSION-FAIL":
      return { ...state, loading: false, error: action.payload };
    case "SESSION-LOGOUT":
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
    case "USER_LOGIN-REQUEST":
      return {
        loading: true,
        reset: () => ({ type: "USER-LOGIN-RESET" }),
      };
    case "USER_LOGIN-SUCCESS": {
      const { email, name } = action.payload;
      return { ...state, loading: false, user: { email, name }, success: true };
    }
    case "USER_LOGIN-FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_LOGIN-RESET":
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
    case "USER_REGISTER-REQUEST":
      return {
        loading: true,
        reset: () => ({ type: "USER-REGISTER-RESET" }),
      };
    case "USER_REGISTER-SUCCESS": {
      const { email, name } = action.payload;
      return { ...state, loading: false, user: { email, name }, success: true };
    }
    case "USER_REGISTER-FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_REGISTER-RESET":
      return {};
    default:
      return state;
  }
};
