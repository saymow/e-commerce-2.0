import { LoginAction, SessionAction } from "../@types/redux";
import api from "../services/api";

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
