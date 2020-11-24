import {
  LoginAction,
  SessionAction,
  RegisterAction,
} from "../@types/redux/user";
import api from "../services/api";
import { SignUpInitialState } from "../utils/schemas";

export const session = () => async (
  dispatch: (arg0: SessionAction) => void
) => {
  try {
    dispatch({ type: "SESSION-REQUEST" });

    const { data } = await api.post("/sessions/me");

    dispatch({ type: "SESSION-SUCCESS", payload: data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "SESSION-FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const login = (email: string, password: string) => async (
  dispatch: (arg0: LoginAction) => void
) => {
  try {
    dispatch({ type: "USER_LOGIN-REQUEST" });

    const { data } = await api.post("/sessions", { email, password });

    dispatch({ type: "USER_LOGIN-SUCCESS", payload: data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_LOGIN-FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const register = (user: typeof SignUpInitialState) => async (
  dispatch: (arg0: RegisterAction) => void
) => {
  try {
    dispatch({ type: "USER_REGISTER-REQUEST" });

    const { data } = await api.post("/users", user);

    dispatch({ type: "USER_REGISTER-SUCCESS", payload: data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_REGISTER-FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};
