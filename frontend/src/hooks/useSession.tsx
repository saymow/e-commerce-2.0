import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SessionState } from "../@types/redux";
import { session } from "../actions/userActions";
import { reduxStore } from "../store";
import { ON_SERVER } from "../utils/constants";

const useSession = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector<typeof reduxStore>(
    (state) => state.userSession
  ) as SessionState;

  useEffect(() => {
    if (ON_SERVER) return;
    dispatch(session());
  }, []);

  return [user, loading];
};

export default useSession;
