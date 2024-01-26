import { DefaultState } from '.';

interface UserOnPing {
  id: string;
  name: string;
  email: string;
}

export interface UserOnCreation extends UserOnPing {
  birth_date: string;
  contact_number: string;
}

export interface User extends UserOnCreation {
  is_confirmed: false;
  is_admin: false;
  created_at: string;
  updated_at: string;
}

export type UserSessionAction =
  | { type: 'USER_LOGIN_REQUEST' }
  | {
      type: 'USER_LOGIN_SUCCESS';
      payload: UserOnPing;
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

export type UsersConfirmAction =
  | { type: 'USER_CONFIRM_REQUEST'; payload: string }
  | {
      type: 'USER_CONFIRM_SUCCESS';
    }
  | { type: 'USER_CONFIRM_FAIL'; payload: { message: string } }
  | { type: 'USER_CONFIRM_RESET' };

export type UsersDeleteAction =
  | { type: 'USER_DELETE_REQUEST'; payload: string }
  | {
      type: 'USER_DELETE_SUCCESS';
    }
  | { type: 'USER_DELETE_FAIL'; payload: { message: string } }
  | { type: 'USER_DELETE_RESET' };

export type UsersSetAdminAction =
  | { type: 'USER_SET_ADMIN_REQUEST'; payload: string }
  | {
      type: 'USER_SET_ADMIN_SUCCESS';
    }
  | { type: 'USER_SET_ADMIN_FAIL'; payload: { message: string } }
  | { type: 'USER_SET_ADMIN_RESET' };

export type UsersCreateAction =
  | { type: 'USER_CREATE_REQUEST' }
  | {
      type: 'USER_CREATE_SUCCESS';
      payload: User;
    }
  | { type: 'USER_CREATE_FAIL'; payload: { message: string } }
  | { type: 'USER_CREATE_RESET' };

export type UsersEditAction =
  | { type: 'USER_EDIT_REQUEST' }
  | {
      type: 'USER_EDIT_SUCCESS';
      payload: User;
    }
  | { type: 'USER_EDIT_FAIL'; payload: { message: string } }
  | { type: 'USER_EDIT_RESET' };

export type UsersShowAction =
  | { type: 'USER_SHOW_REQUEST' }
  | {
      type: 'USER_SHOW_SUCCESS';
      payload: User;
    }
  | { type: 'USER_SHOW_FAIL'; payload: { message: string } }
  | { type: 'USER_SHOW_RESET' };

export type UsersDefaultInteractionState = DefaultState<{
  identifier?: string;
}>;

export type UsersLoginState = DefaultState<{
  user?: UserOnPing | {};
}>;

export type UsersShowState = DefaultState<{
  user?: User;
}>;

export type UsersCreateState = DefaultState<{
  user?: User;
}>;

export type UsersEditState = DefaultState<{
  user?: User;
}>;

export type UsersListState = DefaultState<{
  users?: User[];
}>;
