import { DefaultState } from '../@types/redux';
import {
  UserLoginAction,
  UsersListState,
  UsersListAction,
} from '../@types/redux/user';

export const userLoginReducer = (
  state: DefaultState<{ auth?: boolean }> = { auth: true },
  action: UserLoginAction
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

export const userListReducer = (
  state: UsersListState = {},
  action: UsersListAction
): UsersListState => {
  switch (action.type) {
    case 'USER_LIST_REQUEST':
      return { ...state, loading: true };
    case 'USER_LIST_SUCCESS':
      return { loading: false, users: action.payload };
    case 'USER_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
