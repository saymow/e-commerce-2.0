import { DefaultState } from '../@types/redux';
import { userLoginAction } from '../@types/redux/user';

export const userLoginReducer = (
  state: DefaultState<{ auth?: boolean }> = { auth: true },
  action: userLoginAction
): DefaultState<{ auth?: boolean }> => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { ...state, loading: true };
    case 'USER_LOGIN_SUCCESS':
      return { loading: false, auth: true };
    case 'USER_LOGIN_FAIL':
      return { loading: false, error: action.payload, auth: false };
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
};
