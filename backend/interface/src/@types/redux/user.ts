import { DefaultState } from '.';

interface User {
  id: string;
  name: string;
  email: string;
  birth_date: string;
  contact_number: string;
  is_confirmed: false;
  is_admin: false;
  created_at: string;
  updated_at: string;
}

export type UserLoginAction =
  | { type: 'USER_LOGIN_REQUEST' }
  | {
      type: 'USER_LOGIN_SUCCESS';
    }
  | { type: 'USER_LOGIN_FAIL'; payload: { message: string } }
  | { type: 'USER_LOGOUT' };

export type UsersListAction =
  | { type: 'USER_LIST_REQUEST' }
  | {
      type: 'USER_LIST_SUCCESS';
      payload: User[];
    }
  | { type: 'USER_LIST_FAIL'; payload: { message: string } };

export type UsersListState = DefaultState<{
  users?: User[];
}>;
