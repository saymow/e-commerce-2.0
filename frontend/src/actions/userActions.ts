import {
  LoginAction,
  SessionAction,
  RegisterAction,
  User,
  UserDetailsAction,
  UserConfirmationAction,
} from "../@types/redux/user";
import api from "../services/api";
import { SignUpInitialState } from "../utils/schemas";

export const session = () => async (
  dispatch: (arg0: SessionAction) => void
) => {
  try {
    dispatch({ type: "SESSION_REQUEST" });

    const { data } = await api.post("/sessions/me");

    dispatch({ type: "SESSION_SUCCESS", payload: data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "SESSION_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const sessionLogout = () => async (
  dispatch: (arg0: SessionAction) => void
) => {
  try {
    await api.post("/sessions/logout");

    dispatch({ type: "SESSION_LOGOUT" });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "SESSION_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const login = (email: string, password: string) => async (
  dispatch: (arg0: LoginAction | SessionAction) => void
) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    const { data } = await api.post("/sessions", { email, password });

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
    dispatch({ type: "SESSION_SUCCESS", payload: data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const register = (user: typeof SignUpInitialState) => async (
  dispatch: (arg0: RegisterAction | SessionAction) => void
) => {
  try {
    dispatch({ type: "USER_REGISTER_REQUEST" });

    const { data } = await api.post("/users", user);

    dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
    dispatch({ type: "SESSION_SUCCESS", payload: data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const userDetails = () => async (
  dispatch: (arg0: UserDetailsAction) => void
) => {
  try {
    dispatch({ type: "USER_DETAILS_REQUEST" });

    const { data } = await api.get("/users");

    console.log(data);

    dispatch({ type: "USER_DETAILS_SUCCESS", payload: data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_DETAILS_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const userConfirmation = () => async (
  dispatch: (arg0: UserConfirmationAction) => void
) => {
  try {
    dispatch({ type: "USER_CONFIRMATION_MAIL_REQUEST" });

    await api.post("/users/confirm");

    dispatch({ type: "USER_CONFIRMATION_MAIL_SUCCESS" });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_CONFIRMATION_MAIL_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};
